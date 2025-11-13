import { useAccount } from "wagmi";
import Logo from "@/components/Logo";
import WalletConnection from "@/components/WalletConnection";
import GrantCard from "@/components/GrantCard";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield } from "lucide-react";

const mockGrants = [
  {
    id: "1",
    title: "Merit-Based Scholarship",
    description: "For students with outstanding academic achievement",
    amount: "$5,000",
    encryptedAmount: "0x4a3f...82e1",
    eligibilityCriteria: "GPA ≥ 3.8 and verified enrollment status",
    isEligible: true,
  },
  {
    id: "2",
    title: "Research Grant",
    description: "Supporting innovative research projects",
    amount: "$8,500",
    encryptedAmount: "0x7b2c...91d4",
    eligibilityCriteria: "Graduate student with approved research proposal",
    isEligible: true,
  },
  {
    id: "3",
    title: "Need-Based Financial Aid",
    description: "Financial assistance for students in need",
    amount: "$3,200",
    encryptedAmount: "0x9e5d...43a7",
    eligibilityCriteria: "Verified financial need assessment and enrollment",
    isEligible: false,
  },
];

const Index = () => {
  const { isConnected } = useAccount();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Logo />
            <WalletConnection />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground">
              Support Fairly, Protect Identities.
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Educational institutions can distribute encrypted grants and scholarships,
              allowing only verified students to decrypt and claim funds while maintaining
              anonymity of financial details.
            </p>
          </div>

          {!isConnected && (
            <Alert className="border-encrypted/50 bg-encrypted/5">
              <Shield className="h-4 w-4 text-encrypted" />
              <AlertDescription className="text-foreground">
                Connect your Rainbow Wallet to verify eligibility and unlock grant funds.
                Your identity and financial details remain encrypted and anonymous.
              </AlertDescription>
            </Alert>
          )}

          <div className="grid gap-6 md:grid-cols-2">
            {mockGrants.map((grant) => (
              <GrantCard key={grant.id} {...grant} />
            ))}
          </div>

          {isConnected && (
            <div className="mt-8 p-6 rounded-lg bg-muted/50 border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                How It Works
              </h3>
              <ol className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="font-bold text-foreground">1.</span>
                  <span>Connect your wallet to verify your student eligibility status</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-foreground">2.</span>
                  <span>Browse available grants and scholarships you're eligible for</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-foreground">3.</span>
                  <span>Decrypt grant amounts using your verified credentials</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-foreground">4.</span>
                  <span>Claim funds directly to your wallet - all details remain private</span>
                </li>
              </ol>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
