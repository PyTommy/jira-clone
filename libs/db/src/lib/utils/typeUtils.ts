export type Modify<OriginInterface, OverridingProperties> = Omit<
  OriginInterface,
  keyof OverridingProperties
> &
  OverridingProperties
