

import {  logging, PersistentMap, PersistentSet,Context, u256} from 'near-sdk-as'



const Candidates=new PersistentMap<string,string[]>("Candidate");
const idArray= new PersistentMap<string,string[]>("array of ids");
const VoteArray=new PersistentMap<string,i32[]>("stores votes");
const userParticipation = new PersistentSet<string>("participation");
let startTime : u64;
let endTime : u64;





// View Methods
// Does not change state of the blockchain 
// Does not incur a fee
// Pulls and reads information from blockchain  



export function didParticipate(user:string):bool{
  return userParticipation.has(user)
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

export function startVoting():void{
  startTime = Context.blockTimestamp;
  let duration = (1*60*60) as u64;
  endTime = startTime + (48 * duration); //48 hours
}


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

export function addVote(id:string,index:i32):void{

  assert!(Context.blockTimestamp <= endTime, "Voting has ended. 48 hours elapsed");
  if(VoteArray.contains(id)){
    let tempArray=VoteArray.getSome(id)
    let tempVal=tempArray[index];
    let newVal=tempVal+1;
    tempArray[index]=newVal;
    VoteArray.set(id,tempArray);
  }else{
    let newArray=[0,0];
    newArray[index]=1;
    VoteArray.set(id,newArray);
  }
}

export function recordUser(user:string):void{
  assert!(Context.blockTimestamp <= endTime, "Voting has ended. 48 hours elapsed");
  
  if(!(userParticipation.has(user))){
    userParticipation.add(user)
  }else{
    logging.log('user already voted')
  }
}