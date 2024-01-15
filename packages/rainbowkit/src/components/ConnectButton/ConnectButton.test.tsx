import { screen, waitFor } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { mainnet } from 'wagmi/chains';
import type { Chain } from 'wagmi/chains';
import { renderWithProviders } from '../../../test';
import { Locale } from '../../locales';
import { ConnectButton } from './ConnectButton';

describe('<ConnectButton />', () => {
  const renderTextButton = (locale?: Locale) => {
    const options = {
      props: {
        mock: {},
        chains: [mainnet] as readonly [Chain, ...Chain[]],
        ...(locale ? { locale } : {}),
      },
    };

    renderWithProviders(<ConnectButton />, options);

    return screen.getByTestId('rk-connect-button');
  };

  it('Defaults to English without a `locale` prop', async () => {
    const button = renderTextButton();
    await waitFor(() => expect(button.textContent).toBe('Connect Wallet'));
  });

  it("Displays in English for 'en-US'", async () => {
    const button = renderTextButton('en-US');
    await waitFor(() => expect(button.textContent).toBe('Connect Wallet'));
  });

  it("Displays in Spanish for 'es-419'", async () => {
    const button = renderTextButton('es-419');
    await waitFor(() =>
      expect(button.textContent).toBe('Conectar la billetera'),
    );
  });

  it("Displays in Russian for 'ru-RU'", async () => {
    const button = renderTextButton('ru-RU');
    await waitFor(() => expect(button.textContent).toBe('Подключить кошелек'));
  });
});
