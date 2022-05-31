const useSound = () => {
  const playSound = (path: string) => {
    const audio = new Audio(path);
    audio.play();
  };

  return {
    playSound
  };
};

export default useSound;