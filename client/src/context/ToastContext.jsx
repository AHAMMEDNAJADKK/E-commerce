import { createContext, useContext, useState, useEffect } from "react";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);
  const [progress, setProgress] = useState(100);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setProgress(100);
  };

  useEffect(() => {
    if (!toast) return;

    const duration = 3000;
    const intervalTime = 30;
    const step = 100 / (duration / intervalTime);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          setToast(null);
          return 0;
        }
        return prev - step;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [toast]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {toast && (
        <div className={`toast-container ${toast.type}`}>
          <div className="toast-message">
            {toast.type === "success" ? "✅" : "❌"}
            {toast.message}
          </div>
          <div
            className="toast-progress"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);