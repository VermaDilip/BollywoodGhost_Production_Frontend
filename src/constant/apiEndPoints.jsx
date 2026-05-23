const API_BASE_PATH_TOP_VIDEOS = "/video";
const API_BASE_PATH_ARTISTS = "/artists";
const API_BASE_PATH_TRACKS = "/tracks";
const API_BASE_PATH_REQUESTS = "/requests";
const API_BASE_PATH_SUBJECTS = "/subjects";

const API_ENDPOINTS = {
  // Top Videos
  GET_TOP_VIDEOS: `${API_BASE_PATH_TOP_VIDEOS}/get-all-videos`,
  GET_VIDEO_BY_ID: (videoId) => `${API_BASE_PATH_TOP_VIDEOS}/get-video-by/${videoId}`,

  // Artists
  CREATE_ARTIST: `${API_BASE_PATH_ARTISTS}/create-artist`,
  GET_ALL_ARTISTS: `${API_BASE_PATH_ARTISTS}/get-all-artists`,
  GET_ARTIST_BY_ID: (artistId) => `${API_BASE_PATH_ARTISTS}/get-artist/${artistId}`,
  GET_TRACKS_BY_ARTIST_ID: (artistId) => `${API_BASE_PATH_ARTISTS}/tracks-by-artist/${artistId}`,

  // Tracks
  GET_TRACKS_BY_TYPE: (typeId) => `${API_BASE_PATH_TRACKS}/get-tracks-by-type/${typeId}`,
  GET_TRACK_BY_ID: (trackId) => `${API_BASE_PATH_TRACKS}/get-track-by/${trackId}`,
  UPDATE_PLAY_COUNT: (trackId) => `${API_BASE_PATH_TRACKS}/update-play-count/${trackId}`,
  UPDATE_LIKE_COUNT: (trackId) => `${API_BASE_PATH_TRACKS}/update-like-count/${trackId}`,
  SEARCH_TRACKS: (query) => `${API_BASE_PATH_TRACKS}/search?query=${encodeURIComponent(query)}`,

    //Requests
  CREATE_REQUEST: `${API_BASE_PATH_REQUESTS}/create-request`,
  GET_ALL_REQUESTS: `${API_BASE_PATH_REQUESTS}/get-all-requests`,
  GET_REQUEST_BY_ID: (id) => `${API_BASE_PATH_REQUESTS}/get-request/${id}`,
  DELETE_REQUEST: (id) => `${API_BASE_PATH_REQUESTS}/delete-request/${id}`,

  //Subjects
  CREATE_SUBJECT: `${API_BASE_PATH_SUBJECTS}/create-subject`,
  GET_ALL_SUBJECTS: `${API_BASE_PATH_SUBJECTS}/get-all-subjects`,
  GET_SUBJECT_BY_ID: (id) => `${API_BASE_PATH_SUBJECTS}/get-subject/${id}`,
};

export default API_ENDPOINTS;
