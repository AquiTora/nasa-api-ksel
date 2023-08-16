export const formData = (asteroids) => {
    const newData = asteroids.map((item) => {
        let asteroid = {
            id: item.id,
            name: item.name,
            size: item.estimated_diameter.meters.estimated_diameter_max,
            dangerRate: item.is_potentially_hazardous_asteroid,
            closeDistanceLunar: item.close_approach_data[0].miss_distance.lunar,
            closeDistanceKilo: item.close_approach_data[0].miss_distance.kilometers,
            closeDistanceDate: item.close_approach_data[0].close_approach_date,
            closeDistanceDate: item.close_approach_data[0].close_approach_date_full,
            orbitingBody: item.close_approach_data[0].orbiting_body,
            closeApproachData: item.close_approach_data[0].relative_velocity.kilometers_per_hour
        };

        return asteroid;
    })

    return newData;
}