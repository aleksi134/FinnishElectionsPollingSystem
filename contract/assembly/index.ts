

import { context, logging, PersistentMap } from "near-sdk-as";



const CandidateURL=new PersistentMap<string,string>("CandidateURL");
const CandidatePair=new PersistentMap<string,string[]>("Candidate Pair");
const PromptArray = new PersistentMap<string, string[]>("array of prompts ");
const ElectionEndTime = new PersistentMap<string, u64>("ElectionEndTime");
const VoteArray=new PersistentMap<string,i32[]>("stores votes ");
const userParticipation = new PersistentMap<string,string[]>('user Participation Record')






// View Methods
// Does not change state of the blockchain 
// Does not incur a fee
// Pulls and reads information from blockchain  

export function getUrl(name:string):string{
  if(CandidateURL.contains(name)){
    return CandidateURL.getSome(name)
  }else{
    logging.log(`can't find that user`)
    return ''
  }
}

export function didParticipate(prompt:string, user:string):bool{
  if(userParticipation.contains(prompt)){
    let getArray=userParticipation.getSome(prompt);
    return getArray.includes(user)
  }else{
    logging.log('prompt not found')
    return false
  }
}

export function getAllPrompts():string[]{
  if(PromptArray.contains('AllArrays')){
    return PromptArray.getSome("AllArrays")
  }else{
    logging.log('no prompts found');
    return []
  }
}


export function getVotes(prompt:string):i32[]{
  if(VoteArray.contains(prompt)){
    return VoteArray.getSome(prompt)
  }else{

    logging.log('prompt not found for this vote')
    return[0,0]
  }
}

export function getCandidatePair(prompt:string):string[]{
  if(CandidatePair.contains(prompt)){
    return CandidatePair.getSome(prompt)
  }else{
    logging.log('prompt not found')
    return []
  }
}

// Change Methods 
// Changes state of Blockchain 
// Costs a transaction fee to do so 
// Adds or modifies information to blockchain

export function addUrl(name:string, url:string):void{
  CandidateURL.set(name,url);
  logging.log('added url for '+ name);
}

export function addCandidatePairWithEndTime(
  prompt: string,
  name1: string,
  name2: string,
  endTime: u64
): void {
  CandidatePair.set(prompt, [name1, name2])
  ElectionEndTime.set(prompt, endTime)
}

export function addToPromptArray(prompt:string):void{
  logging.log('added to prompt array')
  if(PromptArray.contains("AllArrays")){
    logging.log('add addition to prompt array')
    let tempArray=PromptArray.getSome("AllArrays")
    tempArray.push(prompt)
    PromptArray.set("AllArrays",tempArray);
  }else{
    PromptArray.set("AllArrays",[prompt])
  }
}

export function clearPromptArray():void{
  logging.log('clearing prompt array');
  PromptArray.delete("AllArrays")
}

export function removeExpiredElections(): void {
  const currentTime = context.blockTimestamp;


  const prompts = getAllPrompts();
  for (let i = 0; i < prompts.length; i++) {
    const prompt = prompts[i];
    if (ElectionEndTime.contains(prompt)) {
      const endTime = ElectionEndTime.getSome(prompt);
      if (currentTime >= endTime) {
        CandidatePair.delete(prompt);
        PromptArray.getSome("AllArrays").splice(i, 1); // Remove from array
        ElectionEndTime.delete(prompt); // Clear end time
      }
    }
  }
}

export function recordUser(prompt:string,user:string):void{
  if(userParticipation.contains(prompt)){
    let tempArray=userParticipation.getSome(prompt);
    tempArray.push(user);
    userParticipation.set(prompt,tempArray)
  }else{
    userParticipation.set(prompt,[user]);
  }
}


