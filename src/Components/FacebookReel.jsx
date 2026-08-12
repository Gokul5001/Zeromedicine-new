const FacebookReel = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "90px 0",
        }}
      >
        <iframe
          src="https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1627868431551915%2F&show_text=false&width=267&t=0"
          width="287"
          height="576"
          style={{ border: "none", overflow: "hidden" }}
          scrolling="no"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          allowFullScreen
          title="Zeromedixine Facebook Reel"
        />
      </div>
    );
  };
  
  export default FacebookReel;
  