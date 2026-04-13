"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Archive, ChevronLeft, Lock, Loader2, Calendar, Hash, Unlock, Trash2, FileText } from "lucide-react"
import { decryptData } from "@/lib/crypto"
import { useToast } from "@/hooks/use-toast"

interface VaultEntry {
  id: string
  date: string
  condition: string
  encryptedData: string
  sessionId: string
}

export default function VaultPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [vault, setVault] = React.useState<VaultEntry[]>([])
  const [selectedEntry, setSelectedEntry] = React.useState<VaultEntry | null>(null)
  const [decryptPassword, setDecryptPassword] = React.useState("")
  const [isDecrypting, setIsDecrypting] = React.useState(false)
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)

  React.useEffect(() => {
    const savedVault = JSON.parse(localStorage.getItem("derm_ai_vault") || "[]")
    setVault(savedVault)
  }, [])

  const handleOpenDecrypt = (entry: VaultEntry) => {
    setSelectedEntry(entry)
    setIsDialogOpen(true)
    setDecryptPassword("")
  }

  const handleDecryptAndOpen = async () => {
    if (!selectedEntry) return
    setIsDecrypting(true)

    try {
      const decryptedDataString = await decryptData(selectedEntry.encryptedData, decryptPassword)
      const decrypted = JSON.parse(decryptedDataString)
      
      // Store in transient storage for the result page to pick up
      localStorage.setItem("derm_ai_result", JSON.stringify(decrypted.data))
      localStorage.setItem("derm_ai_image", decrypted.image || null)
      
      toast({
        title: "Decryption Successful 🔓",
        description: "Viewing restored clinical report."
      })
      
      router.push("/dashboard/result")
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: "The password provided is incorrect."
      })
    } finally {
      setIsDecrypting(false)
    }
  }

  const handleDeleteEntry = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const updatedVault = vault.filter(entry => entry.id !== id)
    localStorage.setItem("derm_ai_vault", JSON.stringify(updatedVault))
    setVault(updatedVault)
    toast({
      title: "Entry Removed",
      description: "The report has been permanently deleted from your browser."
    })
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
        <header className="flex items-center justify-between border-b pb-6">
          <div className="flex items-center gap-3">
            <Archive className="h-10 w-10 text-primary" />
            <div>
              <h1 className="text-3xl font-bold font-headline text-primary">Secure Vault 🛡️</h1>
              <p className="text-sm text-muted-foreground uppercase tracking-widest">Encrypted Local Archive</p>
            </div>
          </div>
          <Button variant="ghost" onClick={() => router.push("/dashboard")} className="gap-2">
            <ChevronLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </header>

        {vault.length === 0 ? (
          <Card className="p-12 text-center space-y-4 border-dashed bg-muted/20">
            <div className="h-20 w-20 bg-muted rounded-full flex items-center justify-center mx-auto">
              <Lock className="h-10 w-10 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">No saved reports</h3>
              <p className="text-muted-foreground max-w-xs mx-auto">Reports saved with password protection will appear here in your browser's secure storage.</p>
            </div>
            <Button onClick={() => router.push("/dashboard")} variant="outline">
              Start New Analysis 🩺
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vault.map((entry) => (
              <Card key={entry.id} className="group hover:shadow-lg transition-all border-l-4 border-l-primary/50 relative">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <Badge variant="outline" className="text-[10px] font-mono mb-2">
                      {entry.sessionId}
                    </Badge>
                    <button 
                      onClick={(e) => handleDeleteEntry(entry.id, e)}
                      className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <CardTitle className="text-lg">{entry.condition}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Calendar className="h-3 w-3" />
                    {new Date(entry.date).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/30 p-3 rounded-lg flex items-center gap-3 text-xs text-muted-foreground">
                    <Lock className="h-4 w-4 text-primary" />
                    <span>Encrypted with AES-256</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => handleOpenDecrypt(entry)} className="w-full gap-2">
                    <Unlock className="h-4 w-4" />
                    Unlock Report
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-primary" />
                Password Verification 🛡️
              </DialogTitle>
              <DialogDescription>
                Please enter the password used to encrypt this report.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="decrypt-pass">Report Password</Label>
                <Input 
                  id="decrypt-pass" 
                  type="password" 
                  autoFocus
                  value={decryptPassword}
                  onChange={(e) => setDecryptPassword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleDecryptAndOpen()}
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleDecryptAndOpen} disabled={isDecrypting} className="w-full">
                {isDecrypting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                Decrypt & Open Report
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
