import {createMuiTheme} from '@material-ui/core/styles'
import {blue, red} from '@material-ui/core/colors'

const theme = createMuiTheme( {
    palette: {
        primary: blue,
        secondary: red,
        type: "light"
    },

} )

export default theme

//defining a custom theme