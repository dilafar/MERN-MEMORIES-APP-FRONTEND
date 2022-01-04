import React ,{useState,useEffect} from "react";
import {TextField,Paper,Button,Typography} from '@material-ui/core';
import FileBase from 'react-file-base64';
import useStyles from './styles'
import {useDispatch} from "react-redux";
import {useSelector} from 'react-redux';
import {createPost,updatePost} from '../../actions/posts'


const Form =({currentId,setCurrentId})=>{


    
    const[creator,setCreator]=useState('');
    const[title,setTitle]=useState('');
    const[message,setMessage]=useState('');
    const[tags,setTags]=useState('');
    const[selectedFile,setSelectedFile]=useState('');
    const dispatch = useDispatch();

    const post = useSelector((state)=> currentId ? state.posts.find((p)=> p._id === currentId ): null);

    useEffect(()=>{
            if(post){
                setCreator(post.creator);
                setTitle(post.title);
                setMessage(post.message);
                setTags(post.tags);
                setSelectedFile(post.selectedFile);
            }
    },[post]);

    const classes =useStyles();
    const handleSubmit = (e)=>{
        e.preventDefault();

        if(currentId){
            dispatch(updatePost(currentId,{creator,title,message,tags,selectedFile}));
        }else{
            dispatch(createPost({creator,title,message,tags,selectedFile}));
        }
        clear();
       
        

    }
    const clear =()=>{
                setCurrentId(null);
                setCreator('');
                setTitle('');
                setMessage('');
                setTags('');
                setSelectedFile('');
            
    }
    return(
       <Paper className={classes.paper}>
           <form autoComplete="off" novalidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
           <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} a memory</Typography>
           <TextField name="creator" variant="outlined" label="Creator"  fullWidth value={creator}  onChange={(e)=> setCreator(e.target.value)}/>
           <TextField name="title" variant="outlined" label="Title"  fullWidth value={title}  onChange={(e)=> setTitle(e.target.value)}/>
           <TextField name="message" variant="outlined" label="Message"  fullWidth value={message}  onChange={(e)=> setMessage(e.target.value)}/>
           <TextField name="tags" variant="outlined" label="Tags"  fullWidth value={tags} onChange={(e)=> setTags(e.target.value)}/>
           <div className={classes.fileInput}>
                <FileBase type="file" 
                 multiple={false}
                 onDone={({base64})=> setSelectedFile(base64)}
                />
           </div>
           <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth> {currentId ? 'Update' : 'Submit'}</Button>
           <Button variant="contained" color="secondary" size="small"  onClick={clear}  fullWidth>Clear</Button>
           </form>
       </Paper>

    );
}

export default Form;