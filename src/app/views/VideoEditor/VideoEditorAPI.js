function saveVideo(video) {
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      return resolve({
        data: {
          id: video.id
        }
      })
    }, 500)
  );
}

export const VideoEditorAPI = {
  saveVideo
}