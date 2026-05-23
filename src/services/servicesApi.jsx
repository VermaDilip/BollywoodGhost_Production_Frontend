// services/servicesApi.jsx
import axios from "axios";
import API_ENDPOINTS from "../constant/apiEndPoints"

const API_URL = `${process.env.REACT_APP_BASE_API_URL}${process.env.REACT_APP_BASE_API}`;

// *============================================|| Get all trading videos ||============================================* //
export const getAllTopVideos = async () => {
  try {
    const response = await axios.get(
      `${API_URL}${API_ENDPOINTS.GET_TOP_VIDEOS}`
    );

    // ✅ Use `success` instead of `status`
    if (response.data.success) {
      return response.data.data; // Return only the video data array
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw new Error(`Error fetching top videos: ${error.message}`);
  }
};

// *============================================|| Get single video by ID ||============================================* //
export const getVideoById = async (videoId) => {
  try {
    const response = await axios.get(`${API_URL}${API_ENDPOINTS.GET_VIDEO_BY_ID(videoId)}`);
    return response.data.data;
  } catch (error) {
    throw new Error(`Error fetching video: ${error.message}`);
  }
};

// *============================================|| Create new artist ||============================================* //
export const createArtist = async (artistData) => {
  try {
    const response = await axios.post(`${API_URL}${API_ENDPOINTS.CREATE_ARTIST}`, artistData);

    if (response.data.success) {
      return response.data.data; // Return the created artist object
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw new Error(`Error creating artist: ${error.message}`);
  }
};

// *============================================|| Get all artists ||============================================* //
// export const getAllArtists = async () => {
//   try {
//     const response = await axios.get(`${API_URL}${API_ENDPOINTS.GET_ALL_ARTISTS}`);

//     if (response.data.success) {
//       return response.data.data; // Return the list of artists
//     } else {
//       throw new Error(response.data.message);
//     }
//   } catch (error) {
//     throw new Error(`Error fetching artists: ${error.message}`);
//   }
// };
export const getAllArtists = async () => {
  try {
    const response = await axios.get(`${API_URL}${API_ENDPOINTS.GET_ALL_ARTISTS}`);

    if (response.data.success) {
      const artists = response.data.data;

      // Shuffle the array randomly
      const shuffledArtists = artists.sort(() => Math.random() - 0.5);

      return shuffledArtists;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw new Error(`Error fetching artists: ${error.message}`);
  }
};

// *============================================|| Fetch artist data by ID ||============================================* //
export const getArtistById = async (artistId) => {
  try {
    const response = await axios.get(`${API_URL}${API_ENDPOINTS.GET_ARTIST_BY_ID(artistId)}`);

    if (response.data.success) {
      return response.data.data; // Return the artist data
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw new Error(`Error fetching artist by ID: ${error.message}`);
  }
};

// *============================================|| Get tracks by track type,randomized list of tracks ||============================================* //
// export const getTracksByType = async (trackType) => {
//   try {
//     const response = await axios.get(`${API_URL}${API_ENDPOINTS.GET_TRACKS_BY_TYPE(trackType)}`);

//     if (response.data.success) {
//       return response.data.data; // Return the list of tracks
//     } else {
//       throw new Error(response.data.message);
//     }
//   } catch (error) {
//     throw new Error(`Error fetching tracks by type: ${error.message}`);
//   }
// };
export const getTracksByType = async (trackType) => {
  try {
    const response = await axios.get(`${API_URL}${API_ENDPOINTS.GET_TRACKS_BY_TYPE(trackType)}`);

    if (response.data.success) {
      const tracks = response.data.data;

      // Shuffle the array randomly
      const shuffledTracks = tracks.sort(() => Math.random() - 0.5);

      return shuffledTracks;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw new Error(`Error fetching tracks by type: ${error.message}`);
  }
};


// *============================================|| Get track by ID ||============================================* //
export const getTrackById = async (trackId) => {
  try {
    const response = await axios.get(`${API_URL}${API_ENDPOINTS.GET_TRACK_BY_ID(trackId)}`);

    if (response.data.success) {
      return response.data.data; // Return the track details
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw new Error(`Error fetching track by ID: ${error.message}`);
  }
};

// *============================================|| Get signed embed URL ||============================================* //
export const getSignedEmbedUrl = async (embedKey) => {
  try {
    const formData = new FormData();
    formData.append('embedkey', embedKey);

    const response = await axios.post(
      'https://bollywoodghost.com/api/getsignedurl.php',
      formData
    );

    if (response.data && typeof response.data === 'string') {
      return response.data; // The signed URL string
    } else {
      throw new Error('Invalid response from signed URL API');
    }
  } catch (error) {
    throw new Error(`Error fetching signed URL: ${error.message}`);
  }
};

// *============================================|| Update play count for a track ||============================================* //
export const updatePlayCount = async (trackId) => {
  try {
    const response = await axios.patch(`${API_URL}${API_ENDPOINTS.UPDATE_PLAY_COUNT(trackId)}`);

    if (response.data.success) {
      return response.data.data.playsCount; // Return updated count
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw new Error(`Error updating play count: ${error.message}`);
  }
};

// *============================================|| Update like count for a track ||============================================* //
export const updateLikeCount = async (trackId) => {
  try {
    const response = await axios.patch(`${API_URL}${API_ENDPOINTS.UPDATE_LIKE_COUNT(trackId)}`);

    if (response.data.success) {
      return response.data.data.likesCount; // Return updated count
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw new Error(`Error updating play count: ${error.message}`);
  }
};

// *============================================|| Search tracks by query ||============================================* //
export const searchTracks = async (query) => {
  try {
    const response = await axios.get(`${API_URL}${API_ENDPOINTS.SEARCH_TRACKS(query)}`);
    if (response.data.success) {
      return response.data.data; // return track array
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw new Error(`Track search failed: ${error.message}`);
  }
};

// *============================================|| Get tracks by artist ID ||============================================* //
export const getTracksByArtistId = async (artistId) => {
  try {
    const response = await axios.get(`${API_URL}${API_ENDPOINTS.GET_TRACKS_BY_ARTIST_ID(artistId)}`);

    if (response.data.success) {
      const tracks = response.data.data;

      // Shuffle the tracks randomly
      const shuffledTracks = tracks.sort(() => Math.random() - 0.5);

      return shuffledTracks;
    } else {
      throw new Error(response.data.message || 'Failed to fetch tracks');
    }
  } catch (error) {
    throw new Error(`Error fetching tracks for artist ${artistId}: ${error.message}`);
  }
};

// *============================================|| Create a new user request ||============================================* //
export const createUserRequest = async (requestData) => {
  try {
    const response = await axios.post(`${API_URL}${API_ENDPOINTS.CREATE_REQUEST}`, requestData);

    if (response.data.success) {
      return response.data.data; // Return created request object
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw new Error(`Error creating user request: ${error.message}`);
  }
};

// *============================================|| Get all request subjects ||============================================* //
export const getAllRequestSubjects = async () => {
  try {
    const response = await axios.get(`${API_URL}${API_ENDPOINTS.GET_ALL_SUBJECTS}`);

    if (response.data.success) {
      return response.data.data.reverse(); // Reverse the array before returning
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw new Error(`Error fetching request subjects: ${error.message}`);
  }
};

// *============================================|| This function fetches all products from a local JSON file ||============================================* //

export async function fetchTop50ProductSummaries(offset = 0, limit = 10) {
  const res = await fetch('/demo-data/allproducts.json');
  if (!res.ok) {
    throw new Error('Failed to fetch product data');
  }

  const data = await res.json();
  const sliced = data.slice(offset, offset + limit).map(product => ({
    id: product.id,
    name: product.name,
    slug: product.slug,
    permalink: product.permalink,
    images: product.images,
  }));

  return sliced;
}

// *============================================|| Fetch product by slug ||============================================* //
export async function fetchProductBySlug(slug) {
  const res = await fetch('/demo-data/allproducts.json');
  if (!res.ok) {
    throw new Error('Failed to fetch product data');
  }

  const data = await res.json();

  // Match slug or permalink
  return data.find(
    (product) =>
      product.slug === slug ||
      product.permalink?.toLowerCase().includes(slug.toLowerCase())
  );
}
