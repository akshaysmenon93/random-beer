import {fallBackImage} from "./constants"

//function to display the fallback image in case the feature image does not load
export function handleImageError ( event ) {
    event.target.src = fallBackImage
}