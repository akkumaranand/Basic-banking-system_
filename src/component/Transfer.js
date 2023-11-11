import React, { useState } from 'react';
import { useHistory } from 'react-router';
import Img from './assets/img/Undo.png'

const Transfer= () => {


    const [transfers, setTransfers] = useState([])
    let details = JSON.parse(localStorage.getItem('Details'))
    let fromReg = JSON.parse(localStorage.getItem('BankApp'))
    let AC = details[0].AC
    
    let database = fromReg;
    let history = useHistory()
    
    const [transferInput, setTransferInput] = useState(
        {
            userAccountNumber: AC,
            enterDestinationAccount: "",
            enterAmount: "",
            enterNarration: "",
            checkName: ""
        }
    );
    
    let check;
    const inputTransfer = (e) => {
        const inputTransfers = {...transferInput, [e.target.name]: e.target.value}
        setTransferInput(inputTransfers)
        for (let index = 0; index < database.length; index++) {
            let det = database[index]
            if (det.AC == transferInput.enterDestinationAccount) {
                // console.log(database)
                check = det.AC;
                transferInput.checkName = `${det.firstName} ${det.middleName} ${det.lastName}`;
                document.getElementById('displayName').innerHTML=
                `
                <div class="col-12 p-2">
                        <div class="input-group mb-3 mt-2">
                            <div class="input-group-prepend">
                                <div class="input-group-text">Account Name</div>
                            </div>
                            <input type="text" class="form-control" id="checkName" onKeyUp={inputTransfer} disabled value="${det.firstName} ${det.middleName} ${det.lastName}"/>
                            <input type="checkbox" class="m-2"/>
                        </div> 
                    </div>
                `
                // let transferInput.checkName= document.getElementById('checkName').value;
                // console.log(transferInput.checkName)
            }
            else {
                document.getElementById('displayName').innerHTML=""
            }
        }
        // document.getElementById('checkNarration').innerHTML = ``
        //document.getElementById('checkAmount').innerHTML = ``
    }

    // console.log(transferInput)

    let userTransferObject ={}

    // console.log(userTransferObject)
    let bankApp = [];

    let myImg = new Image()
    myImg.src = "./assets/gif/indicator2.jpg"

    const myLoader = () => {

    }
 
    const transfer = () => {
        if (
            transferInput.userAccountNumber !== "" &&
            transferInput.enterDestinationAccount !== "" &&
            transferInput.enterAmount !== "" &&
            transferInput.enterNarration !== ""
        ) {
            const fromRegistration = fromReg.find(
                (reg) => reg.AC === transferInput.userAccountNumber
            );
    
            if (fromRegistration) {
                const updatedBalance = fromRegistration.myBalance - Number(transferInput.enterAmount);
    
                // Update transfer history
                transfers.push(transferInput);
                localStorage.setItem("Transfer", JSON.stringify(transfers));
    
                // Update user's balance
                const updatedUser = {
                    ...fromRegistration,
                    myBalance: updatedBalance,
                };
                const updatedDatabase = fromReg.map((reg) =>
                    reg.AC === transferInput.userAccountNumber ? updatedUser : reg
                );
    
                // Save updated database
                localStorage.setItem("BankApp", JSON.stringify(updatedDatabase));
    
                // Redirect to Userhome
                history.push("/component/Userhome");
            } else {
                // Handle invalid account number
                alert("Invalid Account Number");
            }
        } else {
            // Handle incomplete transfer details
            alert("Please fill in all transfer details");
        }
    };

    const undo = () => {
        history.push('/component/Userhome')
    }

    return (
        <>
        <div class="container">
            <div class="col-7">
                <div class="row">
                    <div class="col-2" id="undo" onClick={undo}>
                        <img src={Img}/>
                    </div>
                    <div class="text-center h5">Transfer</div>
                </div>
                <hr/>
                <div class="col-12 p-2">
                    <div class="input-group mb-3 mt-2">
                        <div class="input-group-prepend">
                            <div class="input-group-text">Your Account Number</div>
                        </div>
                        <input type="number" class="form-control" name="userAccountNumber" disabled value={AC}/>
                    </div> 
                </div>
                {details.AC}
                <div class="col-12 p-2">
                    <div class="input-group mb-3 mt-2">
                        <div class="input-group-prepend">
                            <div class="input-group-text">Enter Destination Account</div>
                        </div>
                        <input type="number" class="form-control" onKeyUp={inputTransfer} name="enterDestinationAccount"/>
                        {/* <div class="text-danger h6" id="checkDestination"></div> */}
                    </div> 
                </div>
                <div id="displayName">
               
                </div>
                <div class="col-12 p-2">
                    <div class="input-group mb-3 mt-2">
                        <div class="input-group-prepend">
                            <div class="input-group-text">Enter Amount</div>
                        </div>
                        <input type="number" class="form-control" onKeyUp={inputTransfer}  name="enterAmount" id="amount"/>
                        <div class="text-danger h6 col-12" id="checkAmount"></div>
                    </div> 
                </div>
                <div class="col-12 p-2">
                    <div class="input-group mb-3 mt-2">
                        <div class="input-group-prepend">
                            <div class="input-group-text">Enter Narration</div>
                        </div>
                        <input type="text" class="form-control" onKeyUp={inputTransfer} name="enterNarration"/>
                        <div class="text-warning h6 col-12" id="checkNarration"></div>
                    </div> 
                </div>
                <div class="row">
                    <button class="btn btn-primary mx-auto col-md-2 col-3 rounded-pill" onClick={transfer}>Transfer</button>
                </div>
            </div>

            <div class="col-5">

            </div>
        </div>
        </>
    )
}

export default Transfer;