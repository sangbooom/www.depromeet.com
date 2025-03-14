import Image from 'next/image';
import Link from 'next/link';
import { css } from '@emotion/react';
import { motion } from 'framer-motion';

import { ArrowIcon } from '~/components/common/icons/ArrowIcon';
import {
  ICON_POSITION_PATH,
  POSITION_DISPLAY_NAME,
  PositionType,
} from '~/components/recruit-detail/constants';
import { defaultFadeInUpVariants } from '~/constants/motions';
import useMediaQuery from '~/hooks/use-media-query';
import { colors, mediaQuery, radius } from '~/styles/constants';

type Size = 'sm' | 'lg';

export default function RecruitCard({
  positionType,
  size = 'lg',
}: {
  positionType: PositionType;
  size?: Size;
}) {
  const isMobile = useMediaQuery('xs');
  const href = `/recruit/${positionType.toLowerCase()}`;

  const getSize = () => {
    return size === 'lg' && !isMobile ? 'lg' : 'sm';
  };

  return (
    <Link href={href}>
      <motion.section css={cardCss(getSize())} variants={defaultFadeInUpVariants}>
        <div css={cardTitleCss}>
          {getSize() === 'sm' && (
            <Image
              width={isMobile ? 22 : 32}
              height={isMobile ? 22 : 32}
              src={ICON_POSITION_PATH[positionType]}
              alt="category-icon"
            />
          )}
          <h3 css={cardHeadingCss}>{POSITION_DISPLAY_NAME[positionType]}</h3>
        </div>
        <div css={cardLinkCss(size)}>
          {getSize() === 'lg' && '자세히 보기'}
          <ArrowIcon width={32} height={32} />
        </div>
      </motion.section>
    </Link>
  );
}

const cardCss = (size: Size) => css`
  display: flex;
  flex-direction: ${size === 'lg' ? 'column' : 'row'};
  justify-content: space-between;
  align-items: ${size === 'lg' ? 'flex-start' : 'center'};
  padding: 30px;
  height: ${size === 'lg' ? '220px' : '120px'};
  width: ${size === 'lg' ? '332px' : '100%'};
  background: ${colors.gray9};
  border-radius: ${radius.md};
  color: ${colors.gray2};

  transition: all 0.3s;
  cursor: pointer;

  svg > path {
    fill: ${colors.gray3};
  }

  &:hover {
    color: ${colors.white};
    background: ${size === 'lg' ? colors.primary : colors.gray8};

    svg > path {
      fill: ${colors.white};
    }
  }

  ${mediaQuery('xs')} {
    height: 67px;

    border-radius: ${radius.sm};

    &:hover {
      background: ${colors.gray8};
    }
  }
`;

const cardTitleCss = css`
  display: flex;
  align-items: center;

  gap: 20px;
`;

const cardHeadingCss = css`
  font-weight: 600;
  font-size: 2rem;
  line-height: 120%;
  color: ${colors.gray1};

  ${mediaQuery('xs')} {
    font-size: 1.286rem;
  }
`;

const cardLinkCss = (size: Size) => css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: ${size === 'sm' ? 'auto' : '100%'};

  ${mediaQuery('xs')} {
    width: auto;
  }
`;
