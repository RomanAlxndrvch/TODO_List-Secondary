type StateType = {
    age: number
    childrenCount: number
    name: string
}
type ChangeNameType = {
    type: 'CHANGE-NAME',
    newName: string
}
type IncrementAgeType = {
    type: 'INCREMENT-AGE'
}
type IncrementChildrenCountType = {
    type: 'INCREMENT-CHILDREN-COUNT'
}

type MainActionType = ChangeNameType | IncrementAgeType | IncrementChildrenCountType


export const userReducer = (state: StateType, action: MainActionType): StateType => {
    switch (action.type) {
        case 'INCREMENT-AGE':
            return {...state, age: state.age + 1}
        case 'INCREMENT-CHILDREN-COUNT':
            return {...state, childrenCount: state.childrenCount + 1}
        case 'CHANGE-NAME': {
            return {...state, name: action.newName}
        }
        default:
            throw new Error('I dont understand this action type')
    }
}

