// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

abstract contract EIP20Interface {
    /// total amount of tokens
    uint256 public totalSupply;

    function balanceOf(address _owner) public virtual view returns (uint256 balance);

    function transfer(address _to, uint256 _value) public virtual returns (bool success);

    function transferFrom(address _from, address _to, uint256 _value) public virtual returns (bool success);

    function approve(address _spender, uint256 _value) public virtual returns (bool success);

    function allowance(address _owner, address _spender) public virtual view returns (uint256 remaining);

    // Display transactions and approvals
    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);
}