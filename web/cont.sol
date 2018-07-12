pragma solidity ^0.4.0;
contract invE{

    
    struct transacn{
        string curren;
    }
    
    struct productdet{
        uint id;
        string uid;
        mapping (uint => transacn) pmov;
        string loc;
        string intime;
        string outime;
        uint hist;
    }

    
    mapping (uint => productdet) public pdata;
    
function addp(uint idd,string locn,string nam,string itim) public {
    pdata[idd].id=idd;
    pdata[idd].uid=nam;
    pdata[idd].pmov[pdata[idd].hist].curren=nam;
    pdata[idd].hist=pdata[idd].hist+1;
    pdata[idd].loc=locn;
    pdata[idd].intime=itim;
}

function addot(uint idd,string otime) public {
    pdata[idd].outime=otime;
}

function rpro(uint idd) public constant returns (uint,string,string,string){
    return(pdata[idd].id, pdata[idd].uid,pdata[idd].loc,pdata[idd].intime);
}
function hist1(uint idd) public constant returns (uint){
    return(pdata[idd].hist);
}
function hist2(uint idd,uint histtt) public constant returns (string){
    return(pdata[idd].pmov[histtt].curren);
}
}