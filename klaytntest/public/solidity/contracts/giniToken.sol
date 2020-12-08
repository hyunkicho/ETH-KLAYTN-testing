pragma solidity ^0.5.10; //+commit.5a6ea5b1.Emscripten.clang

import "./ERC20Pausable.sol";
import "./ERC20Burnable.sol";

contract giniToken is ERC20Pausable, ERC20Burnable{

  string public name             = "Gini Token";
  string public symbol           = "GINI";
  uint   public decimals         = 18;


  constructor() public
  {
    _mint(msg.sender , 210000000 * 10 ** decimals);//
  }

  function airdropTokens(address[] memory _receiver, uint[] memory _value) public
  {
      require(_receiver.length == _value.length);
      for(uint256 i = 0; i < _receiver.length; i++)
      {
          ERC20.transfer(_receiver[i], _value[i]);
      }
  }


}





