"use strict";

$( document ).ready(function() {

var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://45.118.132.192:8545"));

var crowdfundABI = [{"constant":true,"inputs":[],"name":"creator","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"whitelistedAddresses","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalETH","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"recipientExtraMIT","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"recipientETH","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"exitAddress","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"recipient","type":"address"}],"name":"purchaseMIT","outputs":[{"name":"increaseMIT","type":"uint256"}],"payable":true,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"senderETH","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"mainstreetToken","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"bonus1StartETH","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_mainstreetToken","type":"address"}],"name":"setTokenContract","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"start","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"limitETH","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"senderMIT","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"recipientMIT","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"bonus2StartETH","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"end","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[{"name":"_start","type":"uint256"},{"name":"_end","type":"uint256"},{"name":"_limitETH","type":"uint256"},{"name":"_bonus1StartETH","type":"uint256"},{"name":"_bonus2StartETH","type":"uint256"},{"name":"_exitAddress","type":"address"},{"name":"whitelist1","type":"address"},{"name":"whitelist2","type":"address"},{"name":"whitelist3","type":"address"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"sender","type":"address"},{"indexed":true,"name":"recipient","type":"address"},{"indexed":false,"name":"ETH","type":"uint256"},{"indexed":false,"name":"MIT","type":"uint256"}],"name":"MITPurchase","type":"event"}];
var crowdfundContract = web3.eth.contract(crowdfundABI);
var crowdfundAddress = '0x81f074bb3b158bf81799dcff159521a089e59a37';
var crowdfund = crowdfundContract.at(crowdfundAddress);

var tokenABI = [{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"totalSupply","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}];
var tokenContract = web3.eth.contract(tokenABI);
var tokenAddress = '0x87be146d2e2d2ae71a83895a3ad15c66546af5e2';
var token = tokenContract.at(tokenAddress);


$("#node").html(web3.version.node);

crowdfund.start(function(error, result) {
    if(!error) {
        var start = new Date(result.toString() * 1000);
        $("#start").html(start);
    }
    else {
        console.error(error);
    }
});

crowdfund.end(function(error, result) {
    if(!error) {
        var end = new Date(result.toString() * 1000);
        $("#end").html(end);
    }
    else {
        console.error(error);
    }
});

crowdfund.limitETH(function(error, result) {
    if(!error) {
        $("#limitETH").html(web3.fromWei(result.toString(), "ether"));
    }
    else {
        console.error(error);
    }
});

crowdfund.exitAddress(function(error, result) {
    if(!error) {
        $("#exitAddress").html(result);
    }
    else {
        console.error(error);
    }
});

function update() {
    crowdfund.totalETH(function(error, result) {
        if(!error) {
            $("#totalETH").html(web3.fromWei(result.toString(), "ether"));
        }
        else {
            console.error(error);
        }
    });

    token.totalSupply(function(error, result) {
        if(!error) {
            $("#totalMIT").html(web3.fromWei(result.toString(), "ether"));
        }
        else {
            console.error(error);
        }
    });
}

update();

web3.eth.filter({address: crowdfundAddress}, function(error, result) {
    if (!error) {
        update();
    }
    else {
        console.error(error);
    }
});

});
