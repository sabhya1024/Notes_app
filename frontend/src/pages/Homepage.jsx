import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import RateLimited from '../components/RateLimited';
import { useState } from 'react';
import toast from "react-hot-toast"
import axios from "axios"
import NoteCard from '../components/NoteCard';
import api from '../lib/axios.js';
import NoteNotFound from '../components/NoteNotFound.jsx';

const Homepage = () => {
  const [israteLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get('/notes')
        // const data = await res.json();
        console.log(res.data);
        setNotes(res.data);
        setIsRateLimited(false);


      } catch (error) {
        console.error("error occured ", error)
        if (error.response.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("failed to fetch notes")
        }
      } finally {
        setLoading(false)
      }
    }
    
    fetchNotes();
  } , []);

  return (
    <div className="min-h-screen">
      <Navbar></Navbar>

      {israteLimited && (
        <div className="mt-2">
          <RateLimited />
        </div>
      )}

      <div className="max-w-7xl mx-auto p-5 mt-6">
        {loading && (
          <div className="text-center text-primary py-10">Loading Notes</div>
        )}

        {notes.length === 0 && <NoteNotFound />}

        {notes.length > 0 && !israteLimited && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {
              notes.map(note => (
                <NoteCard key={note._id} note={note} setNotes={setNotes}></NoteCard>
              ))
            }

            </div>
        )}
      </div>
    </div>
  );
}

export default Homepage