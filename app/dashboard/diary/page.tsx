'use client';

import type React from 'react';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  FileText,
  ImageIcon,
  LinkIcon,
  Camera,
  Lightbulb,
  Upload,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const evidenceTypes = [
  { type: 'text' as const, label: 'Text Note', icon: FileText },
  { type: 'image' as const, label: 'Image', icon: ImageIcon },
  { type: 'link' as const, label: 'Link', icon: LinkIcon },
  { type: 'screenshot' as const, label: 'Screenshot', icon: Camera },
  { type: 'note' as const, label: 'Shower Thought', icon: Lightbulb },
];

export default function DiaryPage() {
  const { addEvidence, lastCommitDate, dailyTaskCompleted, loading } =
    useAppStore();
  const { toast } = useToast();
  const [selectedType, setSelectedType] = useState<
    'text' | 'image' | 'link' | 'screenshot' | 'note'
  >('text');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const today = new Date().toDateString();
  const hasCommittedToday = lastCommitDate === today;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim() && !imageFile) return;

    setIsSubmitting(true);

    try {
      await addEvidence({
        type: selectedType,
        content: imageFile || content,
        date: new Date().toISOString(),
      });

      // Check if it was first upload of the day
      const wasFirstUpload = !hasCommittedToday;

      if (wasFirstUpload) {
        toast({
          title: 'Daily Task Complete!',
          description:
            "You earned 10 🍍 pineapples for today's evidence + 2 🍍 for your streak!",
        });
      } else {
        toast({
          title: 'Evidence Added',
          description: 'You earned 2 🍍 pineapples for continuing to build!',
        });
      }

      setContent('');
      setImageFile('');
    } catch (error) {
      toast({
        title: 'Error',
        description:
          error instanceof Error ? error.message : 'Failed to add evidence',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-secondary/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold font-serif mb-3">
            Daily Diary
          </h1>
          <p className="text-lg text-muted-foreground">
            Capture your progress, insights, and building moments
          </p>
        </div>

        {hasCommittedToday && (
          <div className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg">
            <p className="text-sm text-emerald-900 dark:text-emerald-100">
              ✨ You've already made your commit today! Keep building—additional
              evidence adds to your story.
            </p>
          </div>
        )}

        <Card className="shadow-lg border-2">
          <CardHeader>
            <CardTitle>Add Evidence</CardTitle>
            <CardDescription>
              Upload any piece of progress to maintain your streak and earn 🍍
              pineapples
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="space-y-3">
                <Label>Evidence Type</Label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {evidenceTypes.map(({ type, label, icon: Icon }) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setSelectedType(type)}
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                        selectedType === type
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50'
                          : 'border-border hover:border-emerald-300 dark:hover:border-emerald-700'
                      }`}
                    >
                      <Icon
                        className={`h-6 w-6 ${
                          selectedType === type
                            ? 'text-emerald-600'
                            : 'text-muted-foreground'
                        }`}
                      />
                      <span
                        className={`text-xs font-medium ${
                          selectedType === type
                            ? 'text-emerald-900 dark:text-emerald-100'
                            : 'text-muted-foreground'
                        }`}
                      >
                        {label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {selectedType === 'image' ? (
                <div className="space-y-3">
                  <Label htmlFor="image">Upload Image</Label>
                  <div className="relative">
                    <input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = () =>
                            setImageFile(reader.result as string);
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="sr-only"
                    />
                    <label
                      htmlFor="image"
                      className="flex items-center justify-center gap-3 px-6 py-4 border-2 border-dashed border-border hover:border-emerald-400 dark:hover:border-emerald-600 rounded-xl cursor-pointer transition-all hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 group"
                    >
                      <Upload className="h-5 w-5 text-muted-foreground group-hover:text-emerald-600 transition-colors" />
                      <span className="text-sm font-medium text-muted-foreground group-hover:text-emerald-600 transition-colors">
                        {imageFile ? 'Change Image' : 'Choose an image file'}
                      </span>
                    </label>
                  </div>
                  {imageFile && (
                    <img
                      src={imageFile || '/placeholder.svg'}
                      alt="Preview"
                      className="max-w-sm rounded-lg border"
                    />
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  <Label htmlFor="content">
                    {selectedType === 'link' ? 'URL' : 'Content'}
                  </Label>
                  <Textarea
                    id="content"
                    placeholder={
                      selectedType === 'link'
                        ? 'https://...'
                        : selectedType === 'note'
                        ? 'That brilliant idea you had in the shower...'
                        : 'Describe your progress, what you learned, or what you built today...'
                    }
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={6}
                    className="resize-none"
                  />
                </div>
              )}

              <Button
                type="submit"
                size="lg"
                className="w-full bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
                disabled={
                  (!content.trim() && !imageFile) || isSubmitting || loading
                }
              >
                <Upload className="mr-2 h-5 w-5" />
                {isSubmitting ? 'Submitting...' : 'Submit Evidence'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-8 p-6 bg-muted/50 rounded-xl border border-border">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <span>📧</span> Email Attachments
          </h3>
          <p className="text-sm text-muted-foreground">
            Forward screenshots, notes, or any evidence to{' '}
            <code className="px-2 py-1 bg-background rounded text-foreground font-mono text-xs">
              attachments@vamo.com
            </code>{' '}
            and they'll automatically appear in your library.
          </p>
        </div>
      </div>
    </div>
  );
}
