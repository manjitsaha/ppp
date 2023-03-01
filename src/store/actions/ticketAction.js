import axios from 'utils/axios';
import { dispatch } from 'store/index';
/* eslint-disable camelcase */
import {
    TICKET_BYID_FAILED,
    TICKET_BYID_REQUEST,
    TICKET_BYID_SUCCESS,
    TICKET_FAILED,
    TICKET_REQUEST,
    TICKET_SUCCESS,
    DELETE_TICKET_FAILED,
    DELETE_TICKET_REQUEST,
    DELETE_TICKET_SUCCESS,
    CREATE_TICKET_FAILED,
    CREATE_TICKET_REQUEST,
    CREATE_TICKET_SUCCESS
} from '../actionsType';

const ticketRequest = () => ({
    type: TICKET_REQUEST
});

const ticketSuccess = (data) => ({
    type: TICKET_SUCCESS,
    payload: data
});

const ticketFailed = () => ({
    type: TICKET_FAILED
});

export const getTickets = (args) =>
    async function () {
        try {
            let url = '/all-ticket';
            if (args.type === 'created-by-me') {
                url = `get-ticket-createdByUser/${args.uid}`;
            } else if (args.type === 'my-ticket') {
                url = `/get-ticket-assignedToUser/${args.uid}`;
            }
            if (args.page) {
                url = `${url}?page=${args.page}`;
            }
            dispatch(ticketRequest());
            const response = await axios.get(url);
            console.log('data', response.data.data);
            if (response.data.status === 'Success') dispatch(ticketSuccess(response.data.data));
        } catch (error) {
            dispatch(ticketFailed(error));
        }
    };

const createTicketRequest = () => ({
    type: CREATE_TICKET_REQUEST
});

const createTicketSuccess = () => ({
    type: CREATE_TICKET_SUCCESS
});

const createTicketFailed = () => ({
    type: CREATE_TICKET_FAILED
});

export const saveTickets = (data) => async () => {
    try {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('note', data.note);
        formData.append('status_id', data.status_id);
        formData.append('priority_id', data.priority_id);
        formData.append('category_id', data.category_id);
        formData.append('sub_category_id', data.sub_category_id);
        formData.append('department_id', data.department_id);
        formData.append('section_id', data.section_id);
        const arr = Object.values(data.files);
        let i = 0;
        while (i < arr.length) {
            if (arr[i]) {
                formData.append('file[]', arr[i]);
            }
            i += 1;
        }
        dispatch(createTicketRequest());
        const response = await axios.post('/generate-ticket', formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        dispatch(createTicketSuccess());
    } catch (error) {
        dispatch(createTicketFailed(error));
    }
};

const getTicketByIdRequest = () => ({
    type: TICKET_BYID_REQUEST
});

const getTicketByIdSuccess = (data) => ({
    type: TICKET_BYID_SUCCESS,
    payload: data
});

const getTicketByIdFailed = () => ({
    type: TICKET_BYID_FAILED
});

export const getTicketById = (ticket_no) => async () => {
    try {
        dispatch(getTicketByIdRequest());
        const response = await axios.get(`/get-ticket-by-ticket-no/${ticket_no}`);
        if (response.data.status === 'Success') dispatch(getTicketByIdSuccess(response.data.data));
    } catch (error) {
        dispatch(getTicketByIdFailed(error));
    }
};

const deleteTicketRequest = () => ({
    type: DELETE_TICKET_REQUEST
});

const deleteTicketSuccess = () => ({
    type: DELETE_TICKET_SUCCESS
});

const deleteTicketFailed = () => ({
    type: DELETE_TICKET_FAILED
});

export const deleteTicket = (ticket_no) => async () => {
    try {
        dispatch(deleteTicketRequest());
        const response = await axios.delete(`/delete-ticket/${ticket_no}`);
        dispatch(deleteTicketSuccess());
    } catch (error) {
        dispatch(deleteTicketFailed(error));
    }
};
