import uuid from 'uuid/v1';

export const categoryCreate = (category) => {
  category.id = uuid();
  category.timeStamp = new Date();
  return {
    type: 'CATEGORY_CREATE',
    payload: category,
  }
}

export const categoryUpdate = (category) => {
  return {
    type: 'CATEGORY_UPDATE',
    payload: category,
  }
}

export const categoryDelete = (category) => {
  return {
    type: 'CATEGORY_DELETE',
    payload: category,
  }
}

export const categoryReset = () => {
  return {
    type: 'CATEGORY_RESET',
  }
}