export const ADD_RULE = "ADD_RULE"
export const REMOVE_RULE = "REMOVE_RULE"
export const COUNT_CARD = "COUNT_CARD"
export const SET_RULES_TAB = "SET_RULES_TAB"


export const addRule = (id, text) => ({
    type: "ADD_RULE",
    id,
    text
})

export const removeRule = (id) => ({
    type: "REMOVE_RULE",
    id
})

export const countCard = (id) => ({
    type: "COUNT_CARD",
    id
})

export const setRulesTab = (card) => ({
    type: "SET_RULES_TAB",
    card
})