import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Albums.css"; // Import CSS file

const Albums = () => {
  const [albums, setAlbums] = useState([]);
  const [newAlbumTitle, setNewAlbumTitle] = useState("");
  const [updateAlbumId, setUpdateAlbumId] = useState(null);
  const [updateAlbumTitle, setUpdateAlbumTitle] = useState("");

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/albums"
      );
      setAlbums(response.data);
    } catch (error) {
      console.error("Error fetching albums:", error);
    }
  };

  const addAlbum = async () => {
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/albums",
        {
          title: newAlbumTitle,
        }
      );
      setAlbums([...albums, response.data]);
      setNewAlbumTitle("");
    } catch (error) {
      console.error("Error adding album:", error);
    }
  };

  const updateAlbum = async () => {
    try {
      await axios.put(
        `https://jsonplaceholder.typicode.com/albums/${updateAlbumId}`,
        {
          title: updateAlbumTitle,
        }
      );
      const updatedAlbums = albums.map((album) =>
        album.id === updateAlbumId
          ? { ...album, title: updateAlbumTitle }
          : album
      );
      setAlbums(updatedAlbums);
      setUpdateAlbumId(null);
      setUpdateAlbumTitle("");
    } catch (error) {
      console.error("Error updating album:", error);
    }
  };

  const deleteAlbum = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/albums/${id}`);
      const filteredAlbums = albums.filter((album) => album.id !== id);
      setAlbums(filteredAlbums);
    } catch (error) {
      console.error("Error deleting album:", error);
    }
  };

  return (
    <div className="container">
      <h1>Albums</h1>
      <div className="add-album">
        <h2>Add Album</h2>
        <input
          type="text"
          value={newAlbumTitle}
          onChange={(e) => setNewAlbumTitle(e.target.value)}
        />
        <button onClick={addAlbum}>Add Album</button>
      </div>
      {updateAlbumId && (
        <div className="update-album">
          <h2>Update Album</h2>
          <input
            type="text"
            value={updateAlbumTitle}
            onChange={(e) => setUpdateAlbumTitle(e.target.value)}
          />
          <button onClick={updateAlbum}>Update</button>
        </div>
      )}
      <div className="album-list">
        {albums.map((album) => (
          <div className="album" key={album.id}>
            <img
              src={`https://entrackr.com/storage/2022/10/Coding-Ninjas.jpg`}
              alt="Album Cover"
            />
            <div className="album-content">
              <div className="album-title">{album.title}</div>
              <div className="album-buttons">
                <button onClick={() => deleteAlbum(album.id)}>Delete</button>
                <button
                  onClick={() => {
                    setUpdateAlbumId(album.id);
                    setUpdateAlbumTitle(album.title);
                  }}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Albums;
