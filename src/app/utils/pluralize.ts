function getPluralForm(count: number, forms: string[]) {
    const cases = [2, 0, 1, 1, 1, 2]
    return forms[
        count % 100 > 4 && count % 100 < 20
            ? 2
            : cases[Math.min(count % 10, 5)]
    ]
}

function pluralize(count: number, forms: string[]) {
    return `${count} ${getPluralForm(Math.floor(count), forms)}`
}

export default pluralize

// forms = ["операцию", "операции", "операций"]