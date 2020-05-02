import {Suspendable, SuspendableComponent} from '../Suspend';
import {ClassicElement, ComponentType, HTMLAttributes} from 'react';

export interface PanelProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'id'>, SuspendableComponent {
  /**
   * Does panel contains header
   */
  header?: boolean;
  /**
   * Component which should be rendered
   */
  component?: ComponentType<Suspendable>;
  /**
   * Components which can accept suspendable props
   */
  children?:
    | ClassicElement<Suspendable>
    | ClassicElement<Suspendable>[];
}
