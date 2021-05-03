export const get_patch_color = (patch_number: string) => {
  const patch_number_int = parseInt(patch_number)
  switch (patch_number_int) {
    case 2:
      return "#f573ba"
    case 3:
      return "#4c7ee8"
    case 4:
      return "#fd6068"
    case 5:
      return "#8a7eff"
    default:
      return "#8a7eff"
  }
}