import Button from "../common/Button";
import Heading from "../common/Heading";
import classNames from "classnames";

interface Props {
  show: boolean;
  title: string;
  content: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const Modal = ({
  show,
  onConfirm,
  onCancel,
  confirmText,
  cancelText,
  title,
  content,
}: Props) => (
  <>
    <div
      className={classNames(
        "fixed w-full h-full top-0 left-0 bg-black opacity-50",
        {
          hidden: !show,
        }
      )}
    />
    <div
      className={classNames(
        "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg text-black text-center",
        {
          hidden: !show,
        }
      )}
    >
      <h3 className="font-bold text-xl mb-2">{title}</h3>
      <p>{content}</p>

      <div className="flex justify-between mt-6">
        <Button variant="secondary" rounded onClick={onCancel}>
          {cancelText}
        </Button>
        <Button variant="primary" rounded onClick={onConfirm}>
          {confirmText}
        </Button>
      </div>
    </div>
  </>
);

export default Modal;
