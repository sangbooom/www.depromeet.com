import Image from 'next/image';
import { css } from '@emotion/react';
import { motion } from 'framer-motion';

import CTAButton from '~/components/common/CTAButton';
import { RECRUIT_STATE } from '~/components/recruit/HeaderSection/HeaderSection';
import { END_DATE, NOTION_RECRUIT_PATH, START_DATE } from '~/constants/common/common';
import { defaultFadeInUpVariants, staggerOne } from '~/constants/motions';
import { defaultFadeInSlideToRightVariants } from '~/constants/motions/motions';
import useGaEvent from '~/hooks/use-ga-event';
import { colors, mediaQuery } from '~/styles/constants';

import {
  ICON_CATEGORY_PATH,
  POSITION_DESCRIPTION,
  POSITION_DISPLAY_NAME,
  POSITION_PREFER_LIST,
  POSITION_WITH_CATEGORY_NAME,
  PositionType,
} from '../constants';

export default function DescriptionSection({ positionType }: { positionType: PositionType }) {
  const { recordApplyEvent } = useGaEvent();

  const positionName = POSITION_DISPLAY_NAME[positionType];

  const startDate = new Date(START_DATE);
  const endDate = new Date(END_DATE);

  const getCurrentState = () => {
    const current = new Date();

    if (startDate > current) return RECRUIT_STATE.PREVIOUS;
    if (endDate < current) return RECRUIT_STATE.FINISH;

    return RECRUIT_STATE.IN_PROGRESS;
  };

  const isInProgress = () => {
    return getCurrentState() === RECRUIT_STATE.IN_PROGRESS;
  };

  return (
    <motion.section
      css={sectionCss}
      variants={staggerOne}
      key={positionType}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.h2 css={headingCss} variants={defaultFadeInUpVariants}>
        {positionName}
      </motion.h2>
      <div css={descriptionCss}>
        <motion.dt variants={defaultFadeInUpVariants}>
          <Image
            width={24}
            height={24}
            src={`${ICON_CATEGORY_PATH[positionType]}`}
            alt="category-icon"
          />
          {POSITION_WITH_CATEGORY_NAME[positionType]}는 이런 일을 해요
        </motion.dt>
        <motion.dd variants={defaultFadeInUpVariants}>
          {POSITION_DESCRIPTION[positionType]}
        </motion.dd>
      </div>
      <div css={descriptionCss}>
        <motion.dt variants={defaultFadeInUpVariants}>
          <Image width={24} height={24} src={'/svg/icon-hand-shake.svg'} alt="category-icon" />
          이런 분들과 함께하고 싶어요
        </motion.dt>
        <motion.dd variants={defaultFadeInUpVariants}>
          <ul css={preferListCss}>
            {POSITION_PREFER_LIST[positionType].map((item, index) => (
              <li css={preferItemCss} key={`position-prefer-item-${index}`}>
                {item}
              </li>
            ))}
          </ul>
        </motion.dd>
      </div>
      <motion.div variants={defaultFadeInSlideToRightVariants}>
        <CTAButton
          disabled={!isInProgress()}
          css={ctaBtnCss}
          onClick={() => {
            recordApplyEvent();
            window.open(NOTION_RECRUIT_PATH);
          }}
        >
          {isInProgress() ? '지원하기' : '모집 기간이 아닙니다.'}
        </CTAButton>
      </motion.div>
      <hr css={dividerCss} />
    </motion.section>
  );
}

const sectionCss = css`
  width: 100%;
  margin-bottom: 60px;
`;

const headingCss = css`
  font-weight: 600;
  font-size: 2.625rem;
  line-height: 120%;

  margin-bottom: 60px;

  ${mediaQuery('xs')} {
    font-size: 1.714rem;

    margin-bottom: 30px;
  }
`;

const descriptionCss = css`
  margin-bottom: 80px;
  font-size: 1.5rem;
  dt {
    display: flex;
    align-items: center;
    gap: 6px;

    font-weight: 600;
    line-height: 29px;

    color: ${colors.gray1};

    margin-bottom: 12px;
  }

  dd {
    line-height: 150%;
    word-break: break-all;
    white-space: pre-wrap;
    color: ${colors.gray3};
  }

  ${mediaQuery('xs')} {
    font-size: 1.143rem;

    margin-bottom: 30px;
  }
`;

const preferListCss = css`
  list-style: disc;
  padding-left: 20px;
`;

const preferItemCss = css`
  line-height: 150%;
`;

const ctaBtnCss = css`
  margin-bottom: 120px;

  ${mediaQuery('xs')} {
    width: 100%;

    margin-top: 20px;
    margin-bottom: 100px;
  }
`;

const dividerCss = css`
  border: 0px;
  border-top: 1px solid ${colors.gray7};
`;
