// action - state management
/* eslint-disable camelcase */
import {
    ROlE_FAILED,
    ROlE_REQUEST,
    ROlE_SUCCESS,
    DEPARTMENT_FAILED,
    DEPARTMENT_REQUEST,
    DEPARTMENT_SUCCESS,
    SAVE_DEPARTMENT_FAILED,
    SAVE_DEPARTMENT_REQUEST,
    SAVE_DEPARTMENT_SUCCESS,
    DELETE_DEPARTMENT_FAILED,
    DELETE_DEPARTMENT_REQUEST,
    DELETE_DEPARTMENT_SUCCESS,
    SECTION_FAILED,
    SECTION_REQUEST,
    SECTION_SUCCESS,
    SAVE_SECTION_FAILED,
    SAVE_SECTION_REQUEST,
    SAVE_SECTION_SUCCESS,
    DELETE_SECTION_FAILED,
    DELETE_SECTION_REQUEST,
    DELETE_SECTION_SUCCESS,
    CORRIDOR_FAILED,
    CORRIDOR_REQUEST,
    CORRIDOR_SUCCESS,
    DELETE_CORRIDOR_FAILED,
    DELETE_CORRIDOR_REQUEST,
    DELETE_CORRIDOR_SUCCESS,
    CATEGORY_REQUEST,
    CATEGORY_SUCCESS,
    CATEGORY_FAILED,
    SAVE_CATEGORY_REQUEST,
    SAVE_CATEGORY_SUCCESS,
    SAVE_CATEGORY_FAILED,
    DELETE_CATEGORY_FAILED,
    DELETE_CATEGORY_REQUEST,
    DELETE_CATEGORY_SUCCESS,
    SUB_CATEGORY_REQUEST,
    SUB_CATEGORY_SUCCESS,
    SUB_CATEGORY_FAILED,
    SAVE_SUB_CATEGORY_REQUEST,
    SAVE_SUB_CATEGORY_SUCCESS,
    SAVE_SUB_CATEGORY_FAILED,
    DELETE_SUB_CATEGORY_FAILED,
    DELETE_SUB_CATEGORY_REQUEST,
    DELETE_SUB_CATEGORY_SUCCESS,
    SAVE_CORRIDOR_FAILED,
    SAVE_CORRIDOR_REQUEST,
    SAVE_CORRIDOR_SUCCESS,
    DELETE_STATUS_REQUEST,
    DELETE_STATUS_SUCCESS,
    DELETE_STATUS_FAILED,
    STATUS_REQUEST,
    STATUS_SUCCESS,
    STATUS_FAILED,
    SAVE_STATUS_REQUEST,
    SAVE_STATUS_SUCCESS,
    SAVE_STATUS_FAILED,
    SAVE_PRIORITY_REQUEST,
    SAVE_PRIORITY_SUCCESS,
    SAVE_PRIORITY_FAILED,
    PRIORITY_REQUEST,
    PRIORITY_SUCCESS,
    PRIORITY_FAILED,
    DELETE_PRIORITY_REQUEST,
    DELETE_PRIORITY_SUCCESS,
    DELETE_PRIORITY_FAILED,
    SAVE_PERMISSION_REQUEST,
    SAVE_PERMISSION_SUCCESS,
    SAVE_PERMISSION_FAILED,
    PERMISSION_REQUEST,
    PERMISSION_SUCCESS,
    PERMISSION_FAILED,
    DELETE_PERMISSION_REQUEST,
    DELETE_PERMISSION_SUCCESS,
    DELETE_PERMISSION_FAILED
} from '../actionsType';

// ==============================|| CONFIG REDUCER ||============================== //

const initialState = {
    loading: false,
    sections: {
        list: [],
        error: null,
        loading: false,
        isSaved: false,
        isDeleted: false
    },
    departments: {
        list: [],
        error: null,
        loading: false,
        isSaved: false,
        isDeleted: false
    },
    roles: {
        list: [],
        error: null,
        loading: false
    },
    corridors: {
        list: [],
        error: null,
        loading: false,
        isSaved: false,
        isDeleted: false
    },
    categories: {
        list: [],
        error: null,
        loading: false,
        isSaved: false,
        isDeleted: false
    },
    subcategories: {
        list: [],
        error: null,
        loading: false,
        isSaved: false,
        isDeleted: false
    },
    permissions: {
        list: [],
        error: null,
        loading: false,
        isSaved: false,
        isDeleted: false
    },
    priorities: {
        list: [],
        error: null,
        loading: false,
        isSaved: false,
        isDeleted: false
    },
    status: {
        list: [],
        error: null,
        loading: false,
        isSaved: false,
        isDeleted: false
    },
    error: null
};

// eslint-disable-next-line
const configReducer = (state = initialState, action) => {
    debugger;
    switch (action.type) {
        case ROlE_REQUEST: {
            return {
                ...state,
                roles: {
                    ...initialState.roles,
                    loading: true
                }
            };
        }
        case ROlE_SUCCESS: {
            return {
                ...state,
                roles: {
                    ...initialState.roles,
                    loading: false,
                    list: action.payload
                }
            };
        }

        case ROlE_FAILED: {
            return {
                ...state,
                roles: {
                    ...initialState.roles,
                    loading: false,
                    error: action.payload
                }
            };
        }

        case DEPARTMENT_REQUEST: {
            return {
                ...state,
                departments: {
                    ...initialState.departments,
                    loading: true
                }
            };
        }
        case DEPARTMENT_SUCCESS: {
            return {
                ...state,
                departments: {
                    ...initialState.departments,
                    loading: false,
                    list: action.payload
                }
            };
        }

        case DEPARTMENT_FAILED: {
            return {
                ...state,
                departments: {
                    ...initialState.departments,
                    loading: false,
                    error: action.payload
                }
            };
        }

        case SAVE_DEPARTMENT_REQUEST: {
            return {
                ...state,
                departments: {
                    ...initialState.departments,
                    loading: true,
                    isSaved: false
                }
            };
        }
        case SAVE_DEPARTMENT_SUCCESS: {
            return {
                ...state,
                departments: {
                    ...initialState.departments,
                    loading: false,
                    isSaved: true
                }
            };
        }

        case SAVE_DEPARTMENT_FAILED: {
            return {
                ...state,
                departments: {
                    ...initialState.departments,
                    loading: false,
                    isSaved: false,
                    error: action.payload
                }
            };
        }

        case DELETE_DEPARTMENT_REQUEST: {
            return {
                ...state,
                departments: {
                    ...initialState.departments,
                    loading: true,
                    isSaved: false,
                    isDeleted: false
                }
            };
        }
        case DELETE_DEPARTMENT_SUCCESS: {
            return {
                ...state,
                departments: {
                    ...initialState.departments,
                    loading: false,
                    isDeleted: true
                }
            };
        }

        case DELETE_DEPARTMENT_FAILED: {
            return {
                ...state,
                departments: {
                    ...initialState.departments,
                    loading: false,
                    isSaved: false,
                    isDeleted: false,
                    error: action.payload
                }
            };
        }

        case SECTION_REQUEST: {
            return {
                ...state,
                sections: {
                    ...initialState.sections,
                    loading: true
                }
            };
        }
        case SECTION_SUCCESS: {
            return {
                ...state,
                sections: {
                    ...initialState.sections,
                    loading: false,
                    list: action.payload
                }
            };
        }

        case SECTION_FAILED: {
            return {
                ...state,
                sections: {
                    ...initialState.sections,
                    loading: false,
                    error: action.payload
                }
            };
        }

        case SAVE_SECTION_REQUEST: {
            return {
                ...state,
                sections: {
                    ...initialState.sections,
                    loading: true,
                    isSaved: false
                }
            };
        }
        case SAVE_SECTION_SUCCESS: {
            return {
                ...state,
                sections: {
                    ...initialState.sections,
                    loading: false,
                    isSaved: true
                }
            };
        }

        case SAVE_SECTION_FAILED: {
            return {
                ...state,
                sections: {
                    ...initialState.sections,
                    loading: false,
                    isSaved: false,
                    error: action.payload
                }
            };
        }

        case DELETE_SECTION_REQUEST: {
            return {
                ...state,
                sections: {
                    ...initialState.sections,
                    loading: true,
                    isDeleted: false
                }
            };
        }
        case DELETE_SECTION_SUCCESS: {
            return {
                ...state,
                sections: {
                    ...initialState.sections,
                    loading: false,
                    isDeleted: true
                }
            };
        }

        case DELETE_SECTION_FAILED: {
            return {
                ...state,
                sections: {
                    ...initialState.sections,
                    loading: false,
                    isDeleted: false,
                    error: action.payload
                }
            };
        }

        case CORRIDOR_REQUEST: {
            return {
                ...state,
                corridors: {
                    ...initialState.corridors,
                    loading: true
                }
            };
        }

        case CORRIDOR_SUCCESS: {
            return {
                ...state,
                corridors: {
                    ...initialState.corridors,
                    loading: false,
                    list: action.payload
                }
            };
        }

        case CORRIDOR_FAILED: {
            return {
                ...state,
                corridors: {
                    ...initialState.corridors,
                    loading: false,
                    error: action.payload
                }
            };
        }

        case SAVE_CORRIDOR_REQUEST: {
            return {
                ...state,
                corridors: {
                    ...initialState.corridors,
                    loading: true,
                    isSaved: false
                }
            };
        }

        case SAVE_CORRIDOR_SUCCESS: {
            return {
                ...state,
                corridors: {
                    ...initialState.corridors,
                    loading: false,
                    isSaved: true
                }
            };
        }

        case SAVE_CORRIDOR_FAILED: {
            return {
                ...state,
                corridors: {
                    ...initialState.corridors,
                    loading: false,
                    isSaved: false,
                    error: action.payload
                }
            };
        }

        case DELETE_CORRIDOR_REQUEST: {
            return {
                ...state,
                corridors: {
                    ...initialState.corridors,
                    loading: true,
                    isDeleted: false
                }
            };
        }
        case DELETE_CORRIDOR_SUCCESS: {
            return {
                ...state,
                corridors: {
                    ...initialState.corridors,
                    loading: false,
                    isDeleted: true
                }
            };
        }

        case DELETE_CORRIDOR_FAILED: {
            return {
                ...state,
                corridors: {
                    ...initialState.corridors,
                    loading: false,
                    isDeleted: false,
                    error: action.payload
                }
            };
        }

        case CATEGORY_REQUEST: {
            return {
                ...state,
                categories: {
                    ...initialState.categories,
                    loading: true
                }
            };
        }
        case CATEGORY_SUCCESS: {
            return {
                ...state,
                categories: {
                    ...initialState.categories,
                    loading: false,
                    list: action.payload
                }
            };
        }

        case CATEGORY_FAILED: {
            return {
                ...state,
                categories: {
                    ...initialState.categories,
                    loading: false,
                    error: action.payload
                }
            };
        }

        case SAVE_CATEGORY_REQUEST: {
            return {
                ...state,
                categories: {
                    ...initialState.categories,
                    loading: true,
                    isSaved: false
                }
            };
        }
        case SAVE_CATEGORY_SUCCESS: {
            return {
                ...state,
                categories: {
                    ...initialState.categories,
                    loading: false,
                    isSaved: true
                }
            };
        }

        case SAVE_CATEGORY_FAILED: {
            return {
                ...state,
                categories: {
                    ...initialState.categories,
                    loading: false,
                    isSaved: false,
                    error: action.payload
                }
            };
        }

        case DELETE_CATEGORY_REQUEST: {
            return {
                ...state,
                categories: {
                    ...initialState.categories,
                    loading: true,
                    isDeleted: false
                }
            };
        }
        case DELETE_CATEGORY_SUCCESS: {
            return {
                ...state,
                categories: {
                    ...initialState.categories,
                    loading: false,
                    isDeleted: true
                }
            };
        }

        case DELETE_CATEGORY_FAILED: {
            return {
                ...state,
                categories: {
                    ...initialState.categories,
                    loading: false,
                    isDeleted: false,
                    error: action.payload
                }
            };
        }

        case SUB_CATEGORY_REQUEST: {
            return {
                ...state,
                subcategories: {
                    ...initialState.subcategories,
                    loading: true
                }
            };
        }
        case SUB_CATEGORY_SUCCESS: {
            return {
                ...state,
                subcategories: {
                    ...initialState.subcategories,
                    loading: false,
                    list: action.payload
                }
            };
        }

        case SUB_CATEGORY_FAILED: {
            return {
                ...state,
                subcategories: {
                    ...initialState.subcategories,
                    loading: false,
                    error: action.payload
                }
            };
        }

        case SAVE_SUB_CATEGORY_REQUEST: {
            return {
                ...state,
                subcategories: {
                    ...initialState.subcategories,
                    loading: true,
                    isSaved: false
                }
            };
        }
        case SAVE_SUB_CATEGORY_SUCCESS: {
            return {
                ...state,
                subcategories: {
                    ...initialState.subcategories,
                    loading: false,
                    isSaved: true
                }
            };
        }

        case SAVE_SUB_CATEGORY_FAILED: {
            return {
                ...state,
                subcategories: {
                    ...initialState.subcategories,
                    loading: false,
                    isSaved: false,
                    error: action.payload
                }
            };
        }

        case DELETE_SUB_CATEGORY_REQUEST: {
            return {
                ...state,
                subcategories: {
                    ...initialState.subcategories,
                    loading: true,
                    isDeleted: false
                }
            };
        }
        case DELETE_SUB_CATEGORY_SUCCESS: {
            return {
                ...state,
                subcategories: {
                    ...initialState.subcategories,
                    loading: false,
                    isDeleted: true
                }
            };
        }

        case DELETE_SUB_CATEGORY_FAILED: {
            return {
                ...state,
                subcategories: {
                    ...initialState.subcategories,
                    loading: false,
                    isDeleted: false,
                    error: action.payload
                }
            };
        }

        // Priority Block

        case PRIORITY_REQUEST: {
            return {
                ...state,
                priorities: {
                    ...initialState.priorities,
                    loading: true
                }
            };
        }
        case PRIORITY_SUCCESS: {
            return {
                ...state,
                priorities: {
                    ...initialState.priorities,
                    loading: false,
                    list: action.payload
                }
            };
        }

        case PRIORITY_FAILED: {
            return {
                ...state,
                priorities: {
                    ...initialState.priorities,
                    loading: false,
                    error: action.payload
                }
            };
        }

        case SAVE_PRIORITY_REQUEST: {
            return {
                ...state,
                priorities: {
                    ...initialState.priorities,
                    loading: true,
                    isSaved: false
                }
            };
        }
        case SAVE_PRIORITY_SUCCESS: {
            return {
                ...state,
                priorities: {
                    ...initialState.priorities,
                    loading: false,
                    isSaved: true
                }
            };
        }

        case SAVE_PRIORITY_FAILED: {
            return {
                ...state,
                priorities: {
                    ...initialState.priorities,
                    loading: false,
                    isSaved: false,
                    error: action.payload
                }
            };
        }

        case DELETE_PRIORITY_REQUEST: {
            return {
                ...state,
                priorities: {
                    ...initialState.priorities,
                    loading: true,
                    isDeleted: false
                }
            };
        }
        case DELETE_PRIORITY_SUCCESS: {
            return {
                ...state,
                priorities: {
                    ...initialState.priorities,
                    loading: false,
                    isDeleted: true
                }
            };
        }

        case DELETE_PRIORITY_FAILED: {
            return {
                ...state,
                priorities: {
                    ...initialState.priorities,
                    loading: false,
                    isDeleted: false,
                    error: action.payload
                }
            };
        }

        // pemission blocks
        case PERMISSION_REQUEST: {
            return {
                ...state,
                permissions: {
                    ...initialState.permissions,
                    loading: true
                }
            };
        }
        case PERMISSION_SUCCESS: {
            return {
                ...state,
                permissions: {
                    ...initialState.permissions,
                    loading: false,
                    list: action.payload
                }
            };
        }

        case PERMISSION_FAILED: {
            return {
                ...state,
                permissions: {
                    ...initialState.permissions,
                    loading: false,
                    error: action.payload
                }
            };
        }

        case SAVE_PERMISSION_REQUEST: {
            return {
                ...state,
                permissions: {
                    ...initialState.permissions,
                    loading: true,
                    isSaved: false
                }
            };
        }
        case SAVE_PERMISSION_SUCCESS: {
            return {
                ...state,
                permissions: {
                    ...initialState.permissions,
                    loading: false,
                    isSaved: true
                }
            };
        }

        case SAVE_PERMISSION_FAILED: {
            return {
                ...state,
                permissions: {
                    ...initialState.permissions,
                    loading: false,
                    isSaved: false,
                    error: action.payload
                }
            };
        }

        case DELETE_PERMISSION_REQUEST: {
            return {
                ...state,
                permissions: {
                    ...initialState.permissions,
                    loading: true,
                    isDeleted: false
                }
            };
        }
        case DELETE_PERMISSION_SUCCESS: {
            return {
                ...state,
                permissions: {
                    ...initialState.permissions,
                    loading: false,
                    isDeleted: true
                }
            };
        }

        case DELETE_PERMISSION_FAILED: {
            return {
                ...state,
                permissions: {
                    ...initialState.permissions,
                    loading: false,
                    isDeleted: false,
                    error: action.payload
                }
            };
        }

        // STATUS BLOCKS

        case STATUS_REQUEST: {
            return {
                ...state,
                status: {
                    ...initialState.status,
                    loading: true
                }
            };
        }
        case STATUS_SUCCESS: {
            return {
                ...state,
                status: {
                    ...initialState.status,
                    loading: false,
                    list: action.payload
                }
            };
        }

        case STATUS_FAILED: {
            return {
                ...state,
                status: {
                    ...initialState.status,
                    loading: false,
                    error: action.payload
                }
            };
        }

        case SAVE_STATUS_REQUEST: {
            return {
                ...state,
                status: {
                    ...initialState.status,
                    loading: true,
                    isSaved: false
                }
            };
        }
        case SAVE_STATUS_SUCCESS: {
            return {
                ...state,
                status: {
                    ...initialState.status,
                    loading: false,
                    isSaved: true
                }
            };
        }

        case SAVE_STATUS_FAILED: {
            return {
                ...state,
                status: {
                    ...initialState.status,
                    loading: false,
                    isSaved: false,
                    error: action.payload
                }
            };
        }

        case DELETE_STATUS_REQUEST: {
            return {
                ...state,
                status: {
                    ...initialState.status,
                    loading: true,
                    isDeleted: false
                }
            };
        }
        case DELETE_STATUS_SUCCESS: {
            return {
                ...state,
                status: {
                    ...initialState.status,
                    loading: false,
                    isDeleted: true
                }
            };
        }

        case DELETE_STATUS_FAILED: {
            return {
                ...state,
                status: {
                    ...initialState.status,
                    loading: false,
                    isDeleted: false,
                    error: action.payload
                }
            };
        }

        default: {
            return { ...state };
        }
    }
};

export default configReducer;
