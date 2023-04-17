import useMintModalStore from "@/stores/mint-modal";
import s from "./style.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import Button from "../Button";
import Loader from "../Loader";

const overlay = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};
const modal = {
  hidden: {
    y: "120vh",
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const MintModal = () => {
  const isOpen = useMintModalStore((s) => s.isOpen);
  const close = useMintModalStore((s) => s.close);
  const nfts = useMintModalStore((s) => s.nfts);
  const resetNfts = useMintModalStore((s) => s.resetNfts);
  const isFetching = useMintModalStore((s) => s.isFetching);
  useEffect(() => {
    if (document !== undefined) {
      document.body.style.overflow = isOpen ? "hidden" : "auto";
    }
  }, [isOpen]);
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          className={s.overlay}
          variants={overlay}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            className={s.modal}
            variants={modal}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className={s.header}>
              <h1 className={s.title}>
                Minted Token{nfts?.length && nfts.length > 1 ? "s" : ""}
              </h1>
            </div>
            <div className={s.body}>
              <div className={s.tokens}>
                {nfts?.map((el) => (
                  <div key={JSON.stringify(el)} className={s.token}>
                    <div className={s.imageWrapper}>
                      <div
                        className={s.image}
                        style={{ backgroundImage: `url(${el.metadata.image})` }}
                      />
                    </div>
                    <div className={s.content}>{el.metadata.name}</div>
                  </div>
                ))}
              </div>
              {isFetching && (
                <div className={s.loaderWrapper}>
                  <Loader />
                </div>
              )}
            </div>
            <div className={s.bottom}>
              <Button
                onClick={() => {
                  close();
                  resetNfts();
                }}
                variant="contained"
                fullWidth
              >
                CONTINUE
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MintModal;
