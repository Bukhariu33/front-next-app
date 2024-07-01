import type {
  Action,
  ButtonAction,
  ComponentAction,
  IconButtonAction,
  OnClick,
  SwitchAction,
  SwitchOnCheck,
} from '@/libs/packages/tables/types';
import type { Namespace } from '@/libs/types/utils/withTranslation';

// Type guard for ButtonAction
export function isButtonAction<T extends Namespace, Data>(
  action: Action<T, Data>,
): action is { onClick: OnClick<Data> } & ButtonAction<T> {
  return action.type === undefined || action.type === 'button';
}

// Type guard for SwitchAction
export function isSwitchAction<T extends Namespace, Data>(
  action: Action<T, Data>,
): action is { onClick: SwitchOnCheck } & SwitchAction<T> {
  return action.type === 'switch';
}

// Type guard for IconButton
export function isIconButtonAction<T extends Namespace, Data>(
  action: Action<T, Data>,
): action is { onClick: OnClick<Data> } & IconButtonAction<T> {
  return action.type === 'iconButton';
}

// Type guard for ComponentAction
export function isComponentAction<T extends Namespace, Data>(
  action: Action<T, Data>,
): action is ComponentAction<T, Data> {
  return action.type === 'component';
}
