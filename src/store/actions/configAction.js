import axios from 'utils/axios';
import { dispatch } from 'store/index';
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
    DELETE_PERMISSION_FAILED,
    SAVE_ROlE_REQUEST,
    SAVE_ROlE_SUCCESS,
    SAVE_ROlE_FAILED,
    DELETE_ROlE_REQUEST,
    DELETE_ROlE_SUCCESS,
    DELETE_ROlE_FAILED
} from '../actionsType';

const roleRequest = () => ({
    type: ROlE_REQUEST
});

const roleSuccess = (data) => ({
    type: ROlE_SUCCESS,
    payload: data
});

const roleFailed = () => ({
    type: ROlE_FAILED
});

export const getRoles = () => async () => {
    try {
        dispatch(roleRequest);
        const response = await axios.get('/all-role');
        console.log('response', response);
        if (response.data.status === 'Success') dispatch(roleSuccess(response.data.data));
    } catch (error) {
        dispatch(roleFailed(error));
    }
};

const saveRoleRequest = () => ({
    type: SAVE_ROlE_REQUEST
});

const saveRoleSuccess = (data) => ({
    type: SAVE_ROlE_SUCCESS,
    payload: data
});

const saveRoleFailed = () => ({
    type: SAVE_ROlE_FAILED
});

export const saveRole = () => async () => {
    try {
        dispatch(saveRoleRequest);
        const response = await axios.post('/create-role');
        if (response.data.status === 'Success') dispatch(saveRoleSuccess(response.data.roles));
    } catch (error) {
        dispatch(saveRoleFailed(error));
    }
};

const deleteRoleRequest = () => ({
    type: DELETE_ROlE_REQUEST
});

const deleteRoleSuccess = (data) => ({
    type: DELETE_ROlE_SUCCESS,
    payload: data
});

const deleteRoleFailed = () => ({
    type: DELETE_ROlE_FAILED
});

export const deleteRole = (id) => async () => {
    try {
        dispatch(deleteRoleRequest);
        const response = await axios.delete('/delete-role');
        if (response.data.status === 'Success') dispatch(deleteRoleSuccess(response.data.roles));
    } catch (error) {
        dispatch(deleteRoleFailed(error));
    }
};

const departmentRequest = () => ({
    type: DEPARTMENT_REQUEST
});

const departmentSuccess = (data) => ({
    type: DEPARTMENT_SUCCESS,
    payload: data
});

const departmentFailed = () => ({
    type: DEPARTMENT_FAILED
});

export const getDepartments = () => async () => {
    try {
        dispatch(departmentRequest());
        const response = await axios.get('all-department');
        if (response.data.status === 'Success') dispatch(departmentSuccess(response.data.data));
    } catch (error) {
        dispatch(departmentFailed());
    }
};

const saveDepartmentRequest = () => ({
    type: SAVE_DEPARTMENT_REQUEST
});

const saveDepartmentSuccess = () => ({
    type: SAVE_DEPARTMENT_SUCCESS
});

const saveDepartmentFailed = () => ({
    type: SAVE_DEPARTMENT_FAILED
});

export const saveDepartments = (data, isEdit) => async () => {
    try {
        let response = null;
        dispatch(saveDepartmentRequest());
        if (isEdit) {
            // formdata.append('id', data.id);
            response = await axios.put('update-department', JSON.stringify(data));
        } else {
            response = await axios.post('create-department', JSON.stringify(data));
        }
        if (response.data.status === 'Success') dispatch(saveDepartmentSuccess());
    } catch (error) {
        dispatch(saveDepartmentFailed());
    }
};

const deleteDepartmentRequest = () => ({
    type: DELETE_DEPARTMENT_REQUEST
});

const deleteDepartmentSuccess = () => ({
    type: DELETE_DEPARTMENT_SUCCESS
});

const deleteDepartmentFailed = () => ({
    type: DELETE_DEPARTMENT_FAILED
});

export const deleteDepartments = (depId) => async () => {
    try {
        dispatch(deleteDepartmentRequest());
        const response = await axios.delete(`delete-department/${depId}`);
        if (response.data.status === 'Success') dispatch(deleteDepartmentSuccess());
    } catch (error) {
        dispatch(deleteDepartmentFailed());
    }
};

const sectionRequest = () => ({
    type: SECTION_REQUEST
});

const sectionSuccess = (data) => ({
    type: SECTION_SUCCESS,
    payload: data
});

const sectionFailed = () => ({
    type: SECTION_FAILED
});

export const getSections = () => async () => {
    try {
        dispatch(sectionRequest);
        const response = await axios.get('/all-section');
        if (response.data.status === 'Success') dispatch(sectionSuccess(response.data.data));
    } catch (error) {
        dispatch(sectionFailed);
    }
};

const saveSectionRequest = () => ({
    type: SAVE_SECTION_REQUEST
});

const saveSectionSuccess = () => ({
    type: SAVE_SECTION_SUCCESS
});

const saveSectionFailed = () => ({
    type: SAVE_SECTION_FAILED
});

export const saveSection = (data, isEdit) => async () => {
    try {
        let response = null;
        dispatch(saveSectionRequest());
        if (isEdit) {
            response = await axios.put('update-section', JSON.stringify(data));
        } else {
            response = await axios.post('create-section', JSON.stringify(data));
        }
        if (response.data.status === 'Success') dispatch(saveSectionSuccess());
    } catch (error) {
        dispatch(saveSectionFailed());
    }
};

const deleteSectionRequest = () => ({
    type: DELETE_SECTION_REQUEST
});

const deleteSectionSuccess = () => ({
    type: DELETE_SECTION_SUCCESS
});

const deleteSectionFailed = () => ({
    type: DELETE_SECTION_FAILED
});

export const deleteSections = (secId) => async () => {
    try {
        dispatch(deleteSectionRequest());
        const response = await axios.delete(`delete-section/${secId}`);
        if (response.data.status === 'Success') dispatch(deleteSectionSuccess());
    } catch (error) {
        dispatch(deleteSectionFailed());
    }
};

const saveCategoryRequest = () => ({
    type: SAVE_CATEGORY_REQUEST
});

const saveCategorySuccess = () => ({
    type: SAVE_CATEGORY_SUCCESS
});

const saveCategoryFailed = () => ({
    type: SAVE_CATEGORY_FAILED
});

export const saveCategory = (data, isEdit) => async () => {
    try {
        let response = null;
        dispatch(saveCategoryRequest());
        if (isEdit) {
            response = await axios.put('update-category ', JSON.stringify(data));
        } else {
            response = await axios.post('create-category', JSON.stringify(data));
        }
        if (response.data.status === 'Success') dispatch(saveCategorySuccess());
    } catch (error) {
        dispatch(saveCategoryFailed(error));
    }
};

const categoryRequest = () => ({
    type: CATEGORY_REQUEST
});

const categorySuccess = (data) => ({
    type: CATEGORY_SUCCESS,
    payload: data
});

const categoryFailed = () => ({
    type: CATEGORY_FAILED
});

export const getcategory = () => async () => {
    try {
        dispatch(categoryRequest());
        const response = await axios.get('all-category');
        if (response.data.status === 'Success') dispatch(categorySuccess(response.data.data));
    } catch (error) {
        dispatch(categoryFailed(error));
    }
};

const deleteCategoryRequest = () => ({
    type: DELETE_CATEGORY_REQUEST
});

const deleteCategorySuccess = () => ({
    type: DELETE_CATEGORY_SUCCESS
});

const deleteCategoryFailed = () => ({
    type: DELETE_CATEGORY_FAILED
});

export const deleteCategory = (catId) => async () => {
    try {
        dispatch(deleteCategoryRequest());
        const response = await axios.delete(`delete-category/${catId}`);
        if (response.data.status === 'Success') dispatch(deleteCategorySuccess());
    } catch (error) {
        dispatch(deleteCategoryFailed());
    }
};

const saveSubCategoryRequest = () => ({
    type: SAVE_SUB_CATEGORY_REQUEST
});

const saveSubCategorySuccess = () => ({
    type: SAVE_SUB_CATEGORY_SUCCESS
});

const saveSubCategoryFailed = () => ({
    type: SAVE_SUB_CATEGORY_FAILED
});

export const saveSubCategory = (data, isEdit) => async () => {
    try {
        let response = null;
        dispatch(saveSubCategoryRequest());
        if (isEdit) {
            response = await axios.put('update-sub-category', JSON.stringify(data));
        } else {
            response = await axios.post('create-sub-category', JSON.stringify(data));
        }
        if (response.data.status === 'Success') dispatch(saveSubCategorySuccess());
    } catch (error) {
        dispatch(saveSubCategoryFailed(error));
    }
};

const subCategoryRequest = () => ({
    type: SUB_CATEGORY_REQUEST
});

const subCategorySuccess = (data) => ({
    type: SUB_CATEGORY_SUCCESS,
    payload: data
});

const subCategoryFailed = () => ({
    type: SUB_CATEGORY_FAILED
});

export const getsubcategory = () => async () => {
    try {
        dispatch(subCategoryRequest());
        const response = await axios.get('all-sub-category');
        if (response.data.status === 'Success') dispatch(subCategorySuccess(response.data.data));
    } catch (error) {
        dispatch(subCategoryFailed(error));
    }
};

const deleteSubCategoryRequest = () => ({
    type: DELETE_SUB_CATEGORY_REQUEST
});

const deleteSubCategorySuccess = () => ({
    type: DELETE_SUB_CATEGORY_SUCCESS
});

const deleteSubCategoryFailed = () => ({
    type: DELETE_SUB_CATEGORY_FAILED
});

export const deleteSubCategory = (subCatId) => async () => {
    try {
        dispatch(deleteSubCategoryRequest());
        const response = await axios.delete(`delete-sub-category/${subCatId}`);
        if (response.data.status === 'Success') dispatch(deleteSubCategorySuccess());
    } catch (error) {
        dispatch(deleteSubCategoryFailed());
    }
};

const saveCorridorRequest = () => ({
    type: SAVE_CORRIDOR_REQUEST
});

const saveCorridorSuccess = () => ({
    type: SAVE_CORRIDOR_SUCCESS
});

const saveCorridorFailed = () => ({
    type: SAVE_CORRIDOR_FAILED
});

export const saveCorridors = (data, isEdit) => async () => {
    try {
        let response = null;
        dispatch(saveCorridorRequest());
        if (isEdit) {
            response = await axios.put('update-corridor', JSON.stringify(data));
        } else {
            response = await axios.post('create-corridor', JSON.stringify(data));
        }
        if (response.data.status === 'Success') dispatch(saveCorridorSuccess());
    } catch (error) {
        dispatch(saveCorridorFailed(error));
    }
};

const corridorRequest = () => ({
    type: CORRIDOR_REQUEST
});

const corridorSuccess = (data) => ({
    type: CORRIDOR_SUCCESS,
    payload: data
});

const corridorFailed = () => ({
    type: CORRIDOR_FAILED
});

export const getcorridors = () => async () => {
    try {
        dispatch(corridorRequest());
        const response = await axios.get('all-corridor');
        if (response.data.status === 'Success') dispatch(corridorSuccess(response.data.data));
    } catch (error) {
        dispatch(corridorFailed(error));
    }
};

const deleteCorridorRequest = () => ({
    type: DELETE_CORRIDOR_REQUEST
});

const deleteCorridorSuccess = () => ({
    type: DELETE_CORRIDOR_SUCCESS
});

const deleteCorridorFailed = () => ({
    type: DELETE_CORRIDOR_FAILED
});

export const deleteCorridor = (corId) => async () => {
    try {
        dispatch(deleteCorridorRequest());
        const response = await axios.delete(`delete-corridor/${corId}`);
        if (response.data.status === 'Success') dispatch(deleteCorridorSuccess());
    } catch (error) {
        dispatch(deleteCorridorFailed());
    }
};

const saveStatusRequest = () => ({
    type: SAVE_STATUS_REQUEST
});

const saveStatusSuccess = () => ({
    type: SAVE_STATUS_SUCCESS
});

const saveStatusFailed = () => ({
    type: SAVE_STATUS_FAILED
});

export const saveStatus = (data, isEdit) => async () => {
    try {
        let response = null;
        dispatch(saveStatusRequest());
        if (isEdit) {
            response = await axios.put('update-status', JSON.stringify(data));
        } else {
            response = await axios.post('create-status', JSON.stringify(data));
        }
        if (response.data.status === 'Success') dispatch(saveStatusSuccess());
    } catch (error) {
        dispatch(saveStatusFailed(error));
    }
};

const statusRequest = () => ({
    type: STATUS_REQUEST
});

const statusSuccess = (data) => ({
    type: STATUS_SUCCESS,
    payload: data
});

const statusFailed = () => ({
    type: STATUS_FAILED
});

export const getStatus = () => async () => {
    try {
        dispatch(statusRequest());
        const response = await axios.get('all-status');
        if (response.data.status === 'Success') dispatch(statusSuccess(response.data.data));
    } catch (error) {
        dispatch(statusFailed(error));
    }
};

const deleteStatusRequest = () => ({
    type: DELETE_STATUS_REQUEST
});

const deleteStatusSuccess = () => ({
    type: DELETE_STATUS_SUCCESS
});

const deleteStatusFailed = () => ({
    type: DELETE_STATUS_FAILED
});

export const deleteStatus = (statId) => async () => {
    try {
        dispatch(deleteStatusRequest());
        const response = await axios.delete(`delete-status/${statId}`);
        if (response.data.status === 'Success') dispatch(deleteStatusSuccess());
    } catch (error) {
        dispatch(deleteStatusFailed());
    }
};

//  for priority

const savePriorityRequest = () => ({
    type: SAVE_PRIORITY_REQUEST
});

const savePrioritySuccess = () => ({
    type: SAVE_PRIORITY_SUCCESS
});

const savePriorityFailed = () => ({
    type: SAVE_PRIORITY_FAILED
});

export const savePriority = (data, isEdit) => async () => {
    try {
        let response = null;
        dispatch(savePriorityRequest());
        if (isEdit) {
            response = await axios.put('update-priority', JSON.stringify(data));
        } else {
            response = await axios.post('create-priority', JSON.stringify(data));
        }
        if (response.data.status === 'Success') dispatch(savePrioritySuccess());
    } catch (error) {
        dispatch(savePriorityFailed(error));
    }
};

const priorityRequest = () => ({
    type: PRIORITY_REQUEST
});

const prioritySuccess = (data) => ({
    type: PRIORITY_SUCCESS,
    payload: data
});

const priorityFailed = () => ({
    type: PRIORITY_FAILED
});

export const getPriority = () => async () => {
    try {
        dispatch(priorityRequest());
        const response = await axios.get('all-priority');
        if (response.data.status === 'Success') dispatch(prioritySuccess(response.data.data));
    } catch (error) {
        dispatch(priorityFailed(error));
    }
};

const deletePriorityRequest = () => ({
    type: DELETE_PRIORITY_REQUEST
});

const deletePrioritySuccess = () => ({
    type: DELETE_PRIORITY_SUCCESS
});

const deletePriorityFailed = () => ({
    type: DELETE_PRIORITY_FAILED
});

export const deletePriority = (priorId) => async () => {
    try {
        dispatch(deletePriorityRequest());
        const response = await axios.delete(`delete-priority/${priorId}`);
        if (response.data.status === 'Success') dispatch(deletePrioritySuccess());
    } catch (error) {
        dispatch(deletePriorityFailed());
    }
};

// for Permission

const savePermissionRequest = () => ({
    type: SAVE_PERMISSION_REQUEST
});

const savePermissionSuccess = () => ({
    type: SAVE_PERMISSION_SUCCESS
});

const savePermissionFailed = () => ({
    type: SAVE_PERMISSION_FAILED
});

export const savePermission = (data, isEdit) => async () => {
    try {
        let response = null;
        dispatch(savePermissionRequest());
        if (isEdit) {
            response = await axios.put('update-permission', JSON.stringify(data));
        } else {
            response = await axios.post('create-permission', JSON.stringify(data));
        }
        if (response.data.status === 'Success') dispatch(savePermissionSuccess());
    } catch (error) {
        dispatch(savePermissionFailed(error));
    }
};

const permissionRequest = () => ({
    type: PERMISSION_REQUEST
});

const permissionSuccess = (data) => ({
    type: PERMISSION_SUCCESS,
    payload: data
});

const permissionFailed = () => ({
    type: PERMISSION_FAILED
});

export const getPermissions = () => async () => {
    try {
        dispatch(permissionRequest());
        const response = await axios.get('all-permission');
        if (response.data.status === 'Success') dispatch(permissionSuccess(response.data.data));
    } catch (error) {
        dispatch(permissionFailed(error));
    }
};

const deletePermissionRequest = () => ({
    type: DELETE_PERMISSION_REQUEST
});

const deletePermissionSuccess = () => ({
    type: DELETE_PERMISSION_SUCCESS
});

const deletePermissionFailed = () => ({
    type: DELETE_PERMISSION_FAILED
});

export const deletePermission = (statId) => async () => {
    try {
        dispatch(deletePermissionRequest());
        const response = await axios.delete(`delete-permission/${statId}`);
        if (response.data.status === 'Success') dispatch(deletePermissionSuccess());
    } catch (error) {
        dispatch(deletePermissionFailed());
    }
};
