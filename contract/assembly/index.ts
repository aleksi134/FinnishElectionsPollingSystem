

import {  logging, PersistentMap, PersistentSet,Context} from 'near-sdk-as'



const Candidates=new PersistentMap<string,string[]>("Candidate");
const idArray= new PersistentMap<string,string[]>("array of ids");
const VoteArray=new PersistentMap<string,i32>("stores votes");
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
    let ids = idArray.getSome("AllArrays");
    return ids;
  }else{
    logging.log('no canditates found');
    return [];
  }
}


export function getVotes(id:string):i32{
  if(VoteArray.contains(id)){
    return VoteArray.getSome(id)
  }else{
    logging.log('id not found for this vote')
    return 0
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
  let idarraytemp=idArray.getSome("AllArrays");
  if(!(idarraytemp.includes(id))){
    Candidates.set(id,[name,party])
    logging.log(Candidates.getSome(id))
  }else{
    logging.log('id already used')
  }
}  

export function addToIDArray(id:string):void{
  if(idArray.contains("AllArrays")){
    let idarraytemp=idArray.getSome("AllArrays")
    if(!(idarraytemp.includes(id))){
    logging.log('add addition to id array')
    let tempArray=idArray.getSome("AllArrays")
    tempArray.push(id)
    idArray.set("AllArrays",tempArray);
  }
  else{
    logging.log('id already used')
  }
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

export function addVote(id:string):void{

  /*assert!(Context.blockTimestamp <= endTime, "Voting has ended. 48 hours elapsed");*/
  if(VoteArray.contains(id)){
    let tempArray=VoteArray.getSome(id)
    let tempVal=tempArray;
    let newVal=tempVal+1;
    tempArray=newVal;
    VoteArray.set(id,tempArray);
  }else{
    let newArray=1;
    VoteArray.set(id,newArray);
  }
}

export function recordUser(user:string):void{
  /*assert!(Context.blockTimestamp <= endTime, "Voting has ended. 48 hours elapsed")*/
  
  if(!(userParticipation.has(user))){
    userParticipation.add(user)
  }else{
    logging.log('user already voted')
  }
}