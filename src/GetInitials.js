import _ from 'lodash'

const parseInitials = (string, initNum, hasSpace) => {

    if (initNum === 0) {
        return string
    }

    const names = string.split(" ")

    _.pull(names, "of", "the", "&", "and")

    let initials = names[0].substring(0, 1).toUpperCase()

    let kerning = hasSpace ? " " : ''

    if (names.length > 2) {
        for (let i = 1; i < names.length - 1; i++) {
            initials += kerning + names[i].substring(0, 1).toUpperCase()
        }
    }

    if (names.length > 1) {
        if (initNum === 1 || isNaN(names[names.length - 1]) === false) {
            initials += kerning + names[names.length - 1]
        } else {
            initials +=
                kerning + names[names.length - 1].substring(0, 1).toUpperCase()
        }
    }

    return initials;
}

const getInitials = (string, cutoff, hasSpace) => {

    let initNum = string.length > cutoff ? hasSpace ? 1 : 2 : 0

    let initials = parseInitials(string, initNum, hasSpace);

    initials = initials.length > cutoff ? parseInitials(string, 2, hasSpace) : initials

    return initials;

}


export default getInitials