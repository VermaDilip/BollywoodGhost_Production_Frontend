export async function fetchVideos() {
  const res = await fetch('/demo-data/videos.json');
  return res.json();
}

export async function fetchComments(videoId) {
  const res = await fetch('/demo-data/comments.json');
  const allComments = await res.json();
  return allComments[videoId] || [];
}

export async function fetchRelated(videoId) {
  const res = await fetch('/demo-data/related.json');
  const allRelated = await res.json();
  return allRelated[videoId] || [];
}

export async function fetchArtistAllData(artistId) {
  const res = await fetch('/demo-data/artistgetalldata.json');
  const all = await res.json();
  return artistId ? all.filter(item => item.artistId === artistId) : all;
}

export async function fetchTrandingVideos() {
  const res = await fetch('/demo-data/trandingvideodata.json');
  return res.json();
}

export async function fetchAICovers() {
  const res = await fetch('/demo-data/aicovers.json');
  return res.json();
}

export async function fetchAcapellas() {
  const res = await fetch('/demo-data/acapella.json');
  return res.json();
}

export async function fetchKaraokeinstrument() {
  const res = await fetch('/demo-data/karaoke.json');
  return res.json();
}