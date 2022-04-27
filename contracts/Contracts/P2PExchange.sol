// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./ReentrancyGuard.sol";

contract P2PExchange is Ownable, ReentrancyGuard {

    using SafeMath for uint256;

    struct UserInfo {
        uint256 amount;
        uint256 depositedTime;
    }

    mapping(address => mapping(address => UserInfo)) public users; // user address => token address => amount
    address public WETH;
    address[] public  tokenList;
    uint256 public fee;

    event Deposit(address indexed _from, address indexed _token, uint256 _amount);
    event Transfer(address indexed _from, address indexed _to, address indexed _token, uint256 _amount);

    event DepositETH(address indexed _from, uint256 _amount);
    event TransferETH(address indexed _from, address indexed _to, uint256 _amount);

    constructor(address _WETH, uint256 _fee) {
        WETH = _WETH;
        fee = _fee;
    }

    receive() external payable {}

    //check whether token exists in polkabridge vault or not
    function existTokenInPool(address _token) public view returns(bool) {
        bool exist = IERC20(_token).balanceOf(address(this)) > 0 ? true : false;
        return exist;
    }

    // transfer token into polkabridge vault
    function depositToken(address _token, uint256 _amount) external {
        require(_token != address(0) && _amount > 0, "invalid token or amount");
        uint256 tokenBalanceBefore = IERC20(_token).balanceOf(address(this));
        IERC20(_token).transferFrom(msg.sender, address(this), _amount);
        uint256 tokenBalanceAfter = IERC20(_token).balanceOf(address(this));
        uint256 tokenRealAmount = tokenBalanceAfter - tokenBalanceBefore;
        // UserInfo storage user = users[msg.sender][_token];
        users[msg.sender][_token].amount = tokenRealAmount.mul(100-fee).div(100);
        users[msg.sender][_token].depositedTime = block.timestamp;
        if (!existTokenInPool(_token))
            tokenList.push(_token);

        emit Deposit(msg.sender, _token, tokenRealAmount);
    }

    // transfer token to destination (user)
    function transferToken(address _dst, address _token, uint256 _amount) external nonReentrant {
        require(users[msg.sender][_token].amount >= _amount && _amount > 0, "no permission");
        uint256 tokenBalanceBefore = IERC20(_token).balanceOf(address(this));
        IERC20(_token).transfer(_dst, _amount);
        uint256 tokenBalanceAfter = IERC20(_token).balanceOf(address(this));
        uint256 tokenRealAmount = tokenBalanceBefore - tokenBalanceAfter;
        users[msg.sender][_token].amount -= tokenRealAmount;

        emit Transfer(address(this), _dst, _token, tokenRealAmount);
    }

    // user cancel transaction after deposit token, he 'll get 99%
    function revokeToken(address _token) external nonReentrant {
        require(_token != address(0), "invalid token or amount");
        uint256 amount = users[msg.sender][_token].amount;
        uint256 toTransfer = amount.mul(100-fee).div(100);
        users[msg.sender][_token].amount -= toTransfer;
        IERC20(_token).transfer(msg.sender, toTransfer);        
    }

    // user cancel transaction after deposit coin, he 'll get 99%
    function revokeETH() external nonReentrant {
        uint256 amount = users[msg.sender][WETH].amount;
        uint256 toTransfer = amount.mul(100-fee).div(100);
        users[msg.sender][WETH].amount -= toTransfer;
        payable(msg.sender).transfer(toTransfer);        
    }

    // transfer coin into polkabridge vault
    function depositETH() external payable {        
        users[msg.sender][WETH].amount = msg.value.mul((100-fee)/100);
        users[msg.sender][WETH].depositedTime = block.timestamp;

        emit DepositETH(msg.sender, msg.value);
    }

    // transfer coin to destination (user)
    function transferETH(address _dst, uint256 _amount) external nonReentrant {
        require(users[msg.sender][WETH].amount >= _amount && _amount > 0, "no permission");
        users[msg.sender][WETH].amount -= _amount;
        payable(_dst).transfer(_amount);        

        emit TransferETH(address(this), _dst, _amount);
    }    

    // given user address and token, return deposit time and deposited amount
    function getUserInfo(address _user, address _token) external view returns (uint256 _depositedTime, uint256 _amount) {
        _depositedTime = users[_user][_token].depositedTime;
        _amount = users[_user][_token].amount;
    }

    // withdraw token
    function withdrawToken(address _token) external onlyOwner nonReentrant {
        uint256 balance = IERC20(_token).balanceOf(address(this));
        require(balance > 0, "not enough amount");
        IERC20(_token).transfer(msg.sender, balance);
    }

    // withdraw ETH
    function withdrawETH() external onlyOwner nonReentrant {
        uint256 balance = address(this).balance;
        require(balance > 0, "not enough amount");
        payable(msg.sender).transfer(balance);
    }

    // withdraw all
    function withdrawAll() external onlyOwner {
        //withdraw all tokens
        for(uint256 i=0; i<tokenList.length; i++)
        {
            uint256 balance = IERC20(tokenList[i]).balanceOf(address(this));
            if(balance > 0)
                IERC20(tokenList[i]).transfer(msg.sender, balance);
        }
        //withdraw ETH
        payable(msg.sender).transfer(address(this).balance);
    }

}