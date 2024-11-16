const videos = [
    {
        name: "Приветик",
        duration: 15,
        id: 1,
    },
    {
        name: "Что я такое",
        duration: 15,
        id: 2,
    },
    {
        name: "Олег тинькофф",
        duration: 15,
        id: 4,
    }
]

export function VideoList() {
    return (
        <>
        <h1>Video list</h1>
        {
            videos.map(function(video){
                return (
                    <div key={video.id}>
                        <p>{video.name}</p>
                        <p>{video.duration}</p>
                        <button>Лайк</button>
                    </div>
                )
            })
        }
        </>
        
    )
}