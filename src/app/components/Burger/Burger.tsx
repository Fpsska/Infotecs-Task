import React, { useRef, useEffect, useState } from 'react';

import './burger.scss';

// /. imports

interface propTypes {
    setBurgerVisibleStatus: (arg: boolean) => any;
    isBurgerVisible: boolean
}

// /. interfaces

const Burger: React.FC<propTypes> = ({ isBurgerVisible, setBurgerVisibleStatus }) => {

    const [isContentVisible, setContentVisibleStatus] = useState<boolean>(false);

    const burgerRef = useRef<HTMLDivElement>(null!);
    const contentRef = useRef<HTMLDivElement>(null!);

    const burgerClose = (): void => {
        setBurgerVisibleStatus(false);
    };

    useEffect(() => {
        isBurgerVisible && !contentRef.current ?
            setTimeout(() => {
                setContentVisibleStatus(true);
            }, 300)
            :
            setContentVisibleStatus(false);
    }, [isBurgerVisible]);

    useEffect(() => {
        const keyHandler = (e: KeyboardEvent): void => {
            if (e.code === 'Escape' && isBurgerVisible) {
                setBurgerVisibleStatus(false);
            }
        };

        const areaHandler = (e: any): void => {
            const validArea = burgerRef.current.contains(e.target);
            const validElements =
                e.target.className === 'burger__wrapper' ||
                e.target.className === 'page__button' ||
                e.target.className === 'burger__button';

            if (!validArea && !validElements) {
                setBurgerVisibleStatus(false);
            }
        };

        document.addEventListener('click', areaHandler);
        document.addEventListener('keydown', keyHandler);
        return () => {
            document.removeEventListener('click', areaHandler);
            document.removeEventListener('keydown', keyHandler);
        };
    }, [isBurgerVisible]);

    return (
        <div className={isBurgerVisible ? 'burger visible' : 'burger'} ref={burgerRef}>
            <div className="burger__wrapper">
                {isContentVisible &&
                    <div className="burger__content" ref={contentRef}>
                        <button className="burger__button" onClick={burgerClose}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M7.11639 7.99994L2.55833 12.558L3.44222 13.4419L8.00027 8.88382L12.5583 13.4419L13.4422 12.558L8.88416 7.99994L13.4422 3.44188L12.5583 2.558L8.00027 7.11605L3.44222 2.558L2.55833 3.44188L7.11639 7.99994Z" fill="" />
                            </svg>
                        </button>

                        <div className="social">
                            <a className="social__link" href="https://github.com/Fpsska/Infotecs-Task" target="_blank">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M7.97553 0C3.57186 0 0 3.57186 0 7.97553C0 11.4985 2.29969 14.4832 5.43119 15.5596C5.82263 15.6086 5.96942 15.3639 5.96942 15.1682C5.96942 14.9725 5.96942 14.4832 5.96942 13.7982C3.76758 14.2875 3.27829 12.7217 3.27829 12.7217C2.93578 11.792 2.39755 11.5474 2.39755 11.5474C1.66361 11.0581 2.44648 11.0581 2.44648 11.0581C3.22936 11.107 3.66972 11.8899 3.66972 11.8899C4.40367 13.1131 5.52905 12.7706 5.96942 12.5749C6.01835 12.0367 6.263 11.6942 6.45872 11.4985C4.69725 11.3028 2.83792 10.6177 2.83792 7.53517C2.83792 6.65443 3.1315 5.96942 3.66972 5.38226C3.6208 5.23547 3.32722 4.40367 3.76758 3.32722C3.76758 3.32722 4.4526 3.1315 5.96942 4.15902C6.6055 3.9633 7.29052 3.91437 7.97553 3.91437C8.66055 3.91437 9.34556 4.01223 9.98165 4.15902C11.4985 3.1315 12.1835 3.32722 12.1835 3.32722C12.6239 4.40367 12.3303 5.23547 12.2813 5.43119C12.7706 5.96942 13.1131 6.70336 13.1131 7.5841C13.1131 10.6667 11.2538 11.3028 9.49235 11.4985C9.78593 11.7431 10.0306 12.2324 10.0306 12.9664C10.0306 14.0428 10.0306 14.8746 10.0306 15.1682C10.0306 15.3639 10.1774 15.6086 10.5688 15.5596C13.7492 14.4832 16 11.4985 16 7.97553C15.9511 3.57186 12.3792 0 7.97553 0Z" fill="" />
                                </svg>
                                <span>sourse code</span>
                            </a>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default Burger;