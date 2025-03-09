import { Badge } from "@/components/ui/badge";

const variants = ["default", "secondary", "error", "success", "warn", "info"];
const sizes = ["default", "sm", "lg"];

const Badges = () => {
  return (
    <div className="p-6 space-y-6">
      {variants.map((variant) => (
        <div key={variant} className="space-y-2">
          <h2 className="text-lg font-bold capitalize">{variant} variant</h2>
          <div className="flex items-center space-x-4">
            {sizes.map((size) => (
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              <Badge key={size} variant={variant} size={size}>
                {`${variant} (${size})`}
              </Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Badges;
