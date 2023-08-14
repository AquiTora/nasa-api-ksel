import { getAllAsteroids } from '../Service/NASAapi';

export async function getStaticProps() {
    const asteroids = await getAllAsteroids();
    console.log('testAsteroids', asteroids);

    return {
        props: {
            asteroids
        }
    }
}

export default function index({ asteroids }) {
    return (
        <div>
            <h1>Hello</h1>
        </div>
    )
}