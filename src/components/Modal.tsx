import { PropsWithChildren } from 'react';

interface ModalProps {
  description?: string;
  onClickClose?: () => void;
}

const Modal = ({ children, description, onClickClose }: ModalProps & PropsWithChildren) => (
  <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>
    <div className="fixed inset-0 z-10 px-4 w-screen overflow-y-auto">
      <div className="flex min-h-full flex-col items-center justify-center text-center sm:items-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-sm p-4 mx-4 w-full bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          <div className="bg-white px-4 pt-4 pb-4 sm:p-6 sm:pb-4">
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <div className="absolute right-[12px] top-[12px] cursor-pointer" onClick={() => onClickClose?.()}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="black"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </div>
              <p className="text-lg mb-2 text-gray-800 w-full text-center">{description}</p>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  </div>
);

export default Modal;
