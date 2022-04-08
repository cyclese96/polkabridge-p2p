// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./ReentrancyGuard.sol";

contract P2PExchange is Ownable, ReentrancyGuard {

    using SafeMath for uint;

    struct UserInfo {
        uint256 amount;
        uint256 depositedTime;
    }

    mapping(address => mapping(address => UserInfo)) users; // user address => token address => amount
    address public WETH;
    address[] tokenList;
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

    function existTokenInPool(address _token) internal view returns(bool) {
        bool exist = IERC20(_token).balanceOf(address(this)) > 0 ? true : false;
        return exist;
    }

    function deposit(address _token, uint256 _amount) external {
        require(_token != address(0) && _amount > 0, "invalid token or amount");
        IERC20(_token).transfer(address(this), _amount);
        UserInfo storage user = users[msg.sender][_token];
        user.amount = _amount.mul((100-fee)/100);
        user.depositedTime = block.timestamp;
        if (!existTokenInPool(_token))
            tokenList.push(_token);

        emit Deposit(msg.sender, _token, _amount);
    }

    function transfer(address _dst, address _token, uint256 _amount) external {
        UserInfo storage user = users[msg.sender][_token];
        require(user.amount >= _amount && _amount > 0, "no permission");
        IERC20(_token).transferFrom(address(this), _dst, _amount);
        user.amount -= _amount;

        emit Transfer(address(this), _dst, _token, _amount);
    }

    function depositETH() external payable {        
        UserInfo storage user = users[msg.sender][WETH];
        user.amount = msg.value.mul((100-fee)/100);
        user.depositedTime = block.timestamp;

        emit DepositETH(msg.sender, msg.value);
    }

    function transferETH(address _dst, uint256 _amount) external {
        UserInfo storage user = users[msg.sender][WETH];
        require(user.amount >= _amount && _amount > 0, "no permission");
        payable(_dst).transfer(_amount);
        user.amount -= _amount;

        emit TransferETH(address(this), _dst, _amount);
    }    

    function getUserInfo(address _user, address _token) external view returns (uint256 _depositedTime, uint256 _amount) {
        _depositedTime = users[_user][_token].depositedTime;
        _amount = users[_user][_token].amount;
    }
    // withdraw token
    function withdrawToken(address _token) external onlyOwner {
        uint256 balance = IERC20(_token).balanceOf(address(this));
        require(balance > 0, "not enough amount");
        IERC20(_token).transfer(msg.sender, balance);
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