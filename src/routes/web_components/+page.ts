export const load = async () => {
    // functional code here

    const framework_experiences = [
        {
            title: "Programming frameworks",
            image: "",
            description1: "",
            description2: "",
            hidden: true
        },
        {
            title: "Laravel",
            image: "/images/frameworks/Laravel.png",
            description1: "The file structure and route system is easy to interpret. It's also customizable with other popular frameworks and packages like tailwind, alpine.js and bootstrap icons.",
            description2: "The database structure can be a bit challenging for beginners, but with practice, it becomes manageable."
        },
        {
            title: "Alpine.js",
            image: "/images/frameworks/Alpinejs.png",
            description1: "Alpine is a fantastic choice for your first javascript framework. It's lightweight and easy to learn, making it perfect for beginners.",
            description2: ""
        },
        {
            title: "SvelteKit",
            image: "/images/frameworks/Svelte.png",
            description1: "The file structure isn't so bad once you get used to it. Just like Laravel it's customizable with other popular frameworks and packages like tailwind, alpine.js and bootstrap icons.",
            description2: "Understanding all the $runes can take some time."
        },
        {
            title: "ASP .NET",
            image: "/images/frameworks/AspDotNet.png",
            description1: "ASP .net sucks for beginners.",
            description2: "Have fun searching for that ONE nuget package that actually works."
        },
    ];

    // return required data
    return {
        framework_experiences
    }
}