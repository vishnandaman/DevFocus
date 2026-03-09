import { supabase } from '../config/supabase.js';
import { v4 as uuidv4 } from 'uuid';
export const startSession= async (req,res)=>{
    try{
        const {userId}=req.body;
        const sessionId=uuidv4();
        const {data,error}=await supabase.from('sessions').insert({
            session_id:sessionId,
            user_id:userId,
            start_time:new Date().toISOString(),
            end_time:null,
            focus_score:0,
            total_time:0,
            productive_time:0,
            distracting_time:0
        }).select('session_id').single();
        if(error){
               throw error;
        }
        return res.status(200).json({sessionId:data.session_id});
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
}

export const trackActivity= async (req,res)=>{
    try{
        const {sessionId,domain,category,duration}=req.body;
        if(!sessionId || !domain || !category || !duration){
            return res.status(400).json({error:'Missing required fields'});
        }
        if(category!== 'productive' && category!== 'distracting' && category!== 'neutral'){
            return res.status(400).json({error:'Invalid category'});
        }
        if(duration<=0){
            return res.status(400).json({error:'Duration must be greater than 0'});
        }
        const {data,error}=await supabase.from('activities').insert({
            session_id:sessionId,
            domain:domain,
            category:category,
            duration:duration,
            timestamp:new Date().toISOString()
        }).select('id').single();
        if(error){
            throw error;
        }
        return res.status(200).json({message:'Activity tracked successfully'});
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
}

export const endSession= async (req,res)=>{
    try{
        const {sessionId}=req.body;
        if(!sessionId){
            return res.status(400).json({error:'Session ID is required'});
        }
        const {data,error}=await supabase.from('sessions').update({
            end_time:new Date().toISOString(),
            total_time:duration,
            productive_time:duration,
            distracting_time:duration
        }).eq('session_id',sessionId).select('session_id').single();
        if(error){
            throw error;
        }
        return res.status(200).json({sessionId:data.session_id,totalTime:data.total_time,productiveTime:data.productive_time,distractingTime:data.distracting_time,focusScore:data.focus_score,endTime:data.end_time});
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
}

export const getSession= async (req,res)=>{
    try{
        const {id}=req.params;
        if (!id){
            return res.status(400).json({error:'Session ID is required'});
        }
        const {data,error}=await supabase.from('sessions').select('*').eq('session_id',id).single();
        if(error){
            throw error;
        }
        return res.status(200).json(data);
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
}

export const getActivities= async (req,res)=>{
    try{
        const {id}=req.params;
        if(!id){
            return res.status(400).json({error:'Session ID is required'});
        }
        const {data,error}=await supabase.from('activities').select('*').eq('session_id',id).order('timestamp',{ascending:false});
        if(error){
            throw error;
        }
        return res.status(200).json(data);
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
}

export const getAnalytics= async (req,res)=>{
    try{
        const {id}=req.params;
        if(!id){
            return res.status(400).json({error:'Session ID is required'});
        }
        const {data,error}=await supabase.from('sessions').select('*').eq('session_id',id).single();
        if(error){
            throw error;
        }
        return res.status(200).json(data);
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
}
export default {startSession,trackActivity,endSession,getSession,getActivities,getAnalytics};