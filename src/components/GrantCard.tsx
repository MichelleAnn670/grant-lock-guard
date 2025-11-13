import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lock, Unlock, CheckCircle2, AlertCircle } from "lucide-react";
import { useAccount } from "wagmi";

interface GrantCardProps {
  id: string;
  title: string;
  description: string;
  amount: string;
  encryptedAmount: string;
  eligibilityCriteria: string;
  isEligible: boolean;
}

const GrantCard = ({
  title,
  description,
  amount,
  encryptedAmount,
  eligibilityCriteria,
  isEligible,
}: GrantCardProps) => {
  const [isDecrypted, setIsDecrypted] = useState(false);
  const [isClaimed, setIsClaimed] = useState(false);
  const { isConnected } = useAccount();

  const handleDecrypt = () => {
    if (isConnected && isEligible) {
      setIsDecrypted(true);
    }
  };

  const handleClaim = () => {
    if (isConnected && isEligible && isDecrypted) {
      setIsClaimed(true);
    }
  };

  return (
    <Card className="transition-all hover:shadow-lg border-border">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <CardTitle className="text-xl">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          {isClaimed ? (
            <Badge variant="outline" className="bg-success/10 text-success border-success">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              Claimed
            </Badge>
          ) : isEligible ? (
            <Badge variant="outline" className="bg-success/10 text-success border-success">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              Eligible
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-muted text-muted-foreground">
              <AlertCircle className="h-3 w-3 mr-1" />
              Not Eligible
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
            <span className="text-sm font-medium text-muted-foreground">Award Amount</span>
            <div className="flex items-center gap-2">
              {isDecrypted ? (
                <>
                  <Unlock className="h-4 w-4 text-success" />
                  <span className="text-lg font-bold text-foreground">{amount}</span>
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4 text-encrypted" />
                  <span className="text-lg font-mono text-encrypted">{encryptedAmount}</span>
                </>
              )}
            </div>
          </div>

          <div className="p-3 rounded-lg bg-muted/50">
            <span className="text-sm font-medium text-muted-foreground block mb-2">
              Eligibility Criteria
            </span>
            <p className="text-sm text-foreground">{eligibilityCriteria}</p>
          </div>
        </div>

        <div className="flex gap-2">
          {!isDecrypted && (
            <Button
              onClick={handleDecrypt}
              disabled={!isConnected || !isEligible || isClaimed}
              className="flex-1"
              variant={isEligible ? "default" : "secondary"}
            >
              <Lock className="h-4 w-4 mr-2" />
              Decrypt Amount
            </Button>
          )}
          {isDecrypted && !isClaimed && (
            <Button
              onClick={handleClaim}
              disabled={!isConnected || !isEligible || isClaimed}
              className="flex-1 bg-success hover:bg-success/90 text-success-foreground"
            >
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Claim Grant
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GrantCard;
