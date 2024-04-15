// Desc: Paths used in React Router
// TODO: move another hardcoded paths here
const paths = {
    registerMentor: '/register-mentor',
} as const;

export type PathKey = keyof typeof paths;
export type PathValue = typeof paths[PathKey];

export default paths;