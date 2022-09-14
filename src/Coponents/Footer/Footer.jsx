import React, { useState } from 'react';
import './Footer.css';
import { useTranslation } from "react-i18next";
import { Modal } from 'react-bootstrap';
import { IoMdClose } from 'react-icons/io';
import Regulation from '../../Docoments/Regulations.pdf';
import WhoWeAre from '../../Docoments/Who we are.pdf';
import Introduction from '../../Docoments/NextGenCrypto Introduction.mp4';
import HowItWorksVideo from '../../Docoments/NextGenHowItWorks.mp4';

export default function Footer({ logos, shieldLogo }) {
  const [ImgModalShow, setImgModalShow] = useState(false);
  const [videoModal, setVideoModal] = useState(false);
  const [nextGenHowItWorks, setNextGenHowItWorks] = useState(false);
  const { t, i18n } = useTranslation();
  const openInNewTabRegulation = url => {
    window.open(Regulation, '_blank');
  };
  const openInNewTabBoard = url => {
    window.open(WhoWeAre, '_blank');
  };
  return (
    <div className='container-fluid nav-color border-top1' id="footer">
      <div className="row d-flex ">
        <div className="col-lg-4 col-md-12 ">
          <img src={shieldLogo} width='154px' alt="" />
          <p className='mt-3 text-cl' style={{ fontSize: "15px" }}>NextGenCrypto.org <span dangerouslySetInnerHTML={{ "__html": "&copy;" }} /> 2022,<br></br> {t('AllRightsReserved')}</p>
        </div>
        <div className="col-lg-4">
          <img src={logos} alt="" />
          <p className='mt-3 text-cl'></p>

          <a href="https://twitter.com/NextGenCrypto_" target="_blank"><img src="twitter.png" alt="" className='mx-1' /></a>
          <a href="https://www.reddit.com/user/NextGenFinance" target="_blank"><img src="reddit.png" alt="" className='mx-1' /></a>
        </div>
        <div className="col-lg-4   " >
          <div className="col-lg-8   d-flex flex-column">
            <span className='mt-3 text-cl' role='button' data-bs-toggle="modal" data-bs-target="#board" style={{ fontSize: "15px" }}>{t("WhoWeAre")}</span>
            <div class="modal fade" id="board" tabindex="-1" aria-labelledby="boardLabel" aria-hidden="true"

            >
              <div class="modal-dialog modal-xl">
                <div class="modal-content" style={{ height: "600px" }}>
                  <div class="modal-header">
                    <h5 class="modal-title text-danger" id="boardLabel">{t("WhoWeAre")}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    {/* <iframe
                      src={WhoWeAre}
                      frameBorder="0"
                      scrolling="auto"
                      height="100%"
                      width="100%"
                    ></iframe> */}
                    <object
                      data={WhoWeAre} type="application/pdf"
                      frameBorder="0"
                      scrolling="auto"
                      height="100%"
                      width="100%"
                    ></object>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-warning" data-bs-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
            <span className='mt-3 text-cl' role='button' onClick={() => setVideoModal(true)} style={{ fontSize: "15px" }}>{t("Introduction")}</span>
            <span className='mt-3 text-cl' role='button' onClick={() => setNextGenHowItWorks(true)} style={{ fontSize: "15px" }}>{t("navbar.1")}</span>

            <span className='mt-3 text-cl' role='button' data-bs-toggle="modal" data-bs-target="#regulation" style={{ fontSize: "15px" }}>{t("Regulation")}</span>
            <div class="modal fade" id="regulation" tabindex="-1" aria-labelledby="regulationLabel" aria-hidden="true"

            >
              <div class="modal-dialog modal-xl">
                <div class="modal-content" style={{ height: "600px" }}>
                  <div class="modal-header">
                    <h5 class="modal-title text-danger" id="regulationLabel">{t("Regulation")}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    {/* <iframe
                      src={Regulation}
                      frameBorder="0"
                      scrolling="auto"
                      height="100%"
                      width="100%"
                    ></iframe> */}
                    <object
                      data={Regulation} type="application/pdf"
                      frameBorder="0"
                      scrolling="auto"
                      height="100%"
                      width="100%"
                    ></object>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-warning" data-bs-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <img src={logos} alt="" /> */}

          <Modal
            show={nextGenHowItWorks} onHide={() => {
              setNextGenHowItWorks(false)
            }}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >

            <Modal.Body className='modal-color' style={{ backgroundColor: "black" }}>
              <div className="row d-flex justify-content-center">
                <div className="col-12 d-flex- justify-content-end">
                  <IoMdClose
                    onClick={() => setNextGenHowItWorks(false)}
                    size={28}
                    className="icon-color"
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <iframe
                  className="modal__video-style"
                  // onLoad={spinner}
                  loading="lazy"
                  width="800"
                  height="500"
                  src={HowItWorksVideo}
                  title="Introduction"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>
            </Modal.Body>
          </Modal>
          <Modal
            show={videoModal} onHide={() => {
              setVideoModal(false)
            }}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >

            <Modal.Body className='modal-color' style={{ backgroundColor: "black" }}>
              <div className="row d-flex justify-content-center">
                <div className="col-12 d-flex- justify-content-end">
                  <IoMdClose
                    onClick={() => setVideoModal(false)}
                    size={28}
                    className="icon-color"
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <iframe
                  className="modal__video-style"
                  // onLoad={spinner}
                  loading="lazy"
                  width="800"
                  height="500"
                  src={Introduction}
                  title="Introduction"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>
            </Modal.Body>
          </Modal>

        </div>
      </div>
    </div>
  )
}
