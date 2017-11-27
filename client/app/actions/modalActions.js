export const SHOW_MODAL = 'SHOW_MODAL';

export const modalActions = {
  showModal: ( bool ) => ({
    type:       SHOW_MODAL,
    bool:       bool,
  }),
}
