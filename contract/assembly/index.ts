

import {  logging, PersistentMap} from 'near-sdk-as'



const Candidates=new PersistentMap<string,string[]>("Candidate");
const idArray= new PersistentMap<string,string[]>("array of ids");
const VoteArray=new PersistentMap<string,i32[]>("stores votes ");
const userParticipation = new PersistentMap<string,string[]>('user Participation Record')






// View Methods
// Does not change state of the blockchain 
// Does not incur a fee
// Pulls and reads information from blockchain  



export function didParticipate(id:string, user:string):bool{
  if(userParticipation.contains(id)){
    let getArray=userParticipation.getSome(id);
    return getArray.includes(user)
  }else{
    logging.log('id not found')
    return false
  }
}

export function getAllIds():string[]{
  if(idArray.contains('AllArrays')){
    return idArray.getSome("AllArrays")
  }else{
    logging.log('no canditates found');
    return []
  }
}



export function getVotes(id:string):i32[]{
  if(VoteArray.contains(id)){
    return VoteArray.getSome(id)
  }else{

    logging.log('id not found for this vote')
    return[0,0]
  }
}

export function getCandidate(id:string):string[]{
  if(Candidates.contains(id)){
    return Candidates.getSome(id)
  }else{
    logging.log('id not found')
    return []
  }
}

// Change Methods 
// Changes state of Blockchain 
// Costs a transaction fee to do so 
// Adds or modifies information to blockchain


export function addCandidate(id:string,name:string,party:string):void{
  if(!(idArray.contains(id))){
    Candidates.set(id,[name,party])
  }else{
    logging.log('id already added')
  }
}  

export function addToIDArray(id:string):void{
  logging.log('added to id array')
  if(idArray.contains("AllArrays")){
    logging.log('add addition to id array')
    let tempArray=idArray.getSome("AllArrays")
    tempArray.push(id)
    idArray.set("AllArrays",tempArray);
  }else{
    idArray.set("AllArrays",[id])
  }
}



/*
export function clearAll():void{
  logging.log('clearingvotes');
  const Candidate
}
*/

export function addVote(name:string,index:i32):void{
  if(VoteArray.contains(name)){
    let tempArray=VoteArray.getSome(name)
    let tempVal=tempArray[index];
    let newVal=tempVal+1;
    tempArray[index]=newVal;
    VoteArray.set(name,tempArray);
  }else{
    let newArray=[0,0];
    newArray[index]=1;
    VoteArray.set(name,newArray);
  }
}

export function recordUser(name:string,user:string):void{
  if(userParticipation.contains(name)){
    let tempArray=userParticipation.getSome(name);
    tempArray.push(user);
    userParticipation.set(name,tempArray)
  }else{
    userParticipation.set(name,[user]);
  }
}